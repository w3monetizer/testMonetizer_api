const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Job = require('../models/Job');

// @desc      Get all jobs
// @route     GET /api/v1/jobs
// @access    Public
exports.getJobs = asyncHandler(async (req, res, next) => { 
  //  res.status(200).json(res.advancedResults);
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page','limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators: $gt, $gte, etc
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource & populate with Virtuals array //
  query = Job.find(JSON.parse(queryStr)).populate('skills');

  // Select Fields if select included //
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort // 
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Descending sort by date //
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Job.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const jobs = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200)
    .json({ success: true, count: jobs.length, pagination, data: jobs });
});

// @desc      Get single job
// @route     GET /api/v1/jobs/:id
// @access    Public
exports.getJob = asyncHandler( async (req, res, next) => { 
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Job not found with id of ${req.params.id}`, 404) // not found in db
    );
  }

  res.status(200).json({ success: true, data: job });
});

// @desc      Create new job
// @route     POST /api/v1/jobs
// @access    Private
exports.createJob = asyncHandler(async (req, res, next) => { 
  // Add user to req.body //
  req.body.user = req.user.id;

  // Check for the 1 published job of the user/publisher //
  const publishedJob = await Job.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one job //
  if (publishedJob && req.user.role !== 'admin') {
    return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a job`, 400));
  }

  const job = await Job.create(req.body);

  res.status(201).json({
    success: true,
    data: job
  })
});

// @desc      Update job
// @route     PUT /api/v1/jobs/:id
// @access    Private
exports.updateJob = asyncHandler( async (req, res, next) => { 
  let job = await Job.findById(req.params.id);

  if (!job) {
    return next(
        new ErrorResponse(`Job not found with id of ${req.params.id}`, 404) // not found in db
      );
  }

  // Make sure user is job owner // 
  // Test scripts reference & Test Results // 
  if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.params.id} is not authorized to update`, 401) // not authorized
    );
  }

  // Update record in db //
  job = await Job.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({ success: true, data: job });
});

// @desc      Delete job
// @route     DELETE /api/v1/jobs/:id
// @access    Private
exports.deleteJob = asyncHandler(async (req, res, next) => { 
  // Find job to delete // 
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
        new ErrorResponse(`Job not found with id of ${req.params.id}`, 404) // not found in db
      );
  }

  // Task: Ensure user is job Owner or Admin // 
  // Test: Test scripts reference <ref> & Test Results <ref> // 
  // if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(`User ${req.params.id} is not authorized to delete`, 401) // not authorized
  //   );
  // }

  // Delete job - this remove will also trigger the middleware for deleting its skills //
  job.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Get jobs within a radius
// @route     GET /api/v1/jobs/radius/:zipcode/:distance
// @access    Private
exports.getJobsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/long from geocoder //
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians - unit of measure for sphears //
  // Divide distance by radius of Earth //
  // Earth Radius = 3,963 miles / 6,378 km // 
  const radius = distance / 3963; // using miles

  // Find jobs in radius //
  const jobs = await Job.find({
    location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
  });

  // Send response //
  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs
  });
});

// @desc      Upload photo for job
// @route     PUT /api/v1/jobs/:id/photo
// @access    Private
exports.jobPhotoUpload = asyncHandler(async (req, res, next) => { 
  // Find resource to add image/file to // 
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404) // not found in db
    );
  }

  // Task: Ensure user is job Owner or Admin // 
  // Test: Test scripts reference <ref> & Test Results <ref> // 
  // if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(`User ${req.params.id} is not authorized`, 401) // not authorized
  //   );
  // }

  if (!req.files) {
    return next(
      new ErrorResponse(`Please upload a file`, 400) // no file to upload
    );
  }

  // console.log(req.files);
  const file = req.files.file;

  // Make sure the image is a photo //
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize //
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  // Create custom server side filename //
  file.name = `photo_${job._id}${path.parse(file.name).ext}`;

  // Save file to server upload path //
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Job.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    })
  });
});