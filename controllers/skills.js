const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Skill = require('../models/Skill');
const Job = require('../models/Job');

// @desc      Get skills
// @route     GET /api/v1/skills
// @route     GET /api/v1/jobs/:jobId/skills
// @access    Public
exports.getSkills = asyncHandler(async (req, res, next) => {
  if (req.params.jobId) {  // Check if there is a jobId in the request
    const skills = await Skill.find({ job: req.params.jobId });
    
    return res.status(200).json({
      success: true,
      counr: skills.length,
      data: skills
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single skill
// @route     GET /api/v1/skills/:id
// @access    Public
exports.getSkill = asyncHandler(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id).populate({
    path: 'job',
    select: 'name description'
  });

  if (!skill) {
    return next(new ErrorResponse(`No skill with the id of ${req.params.id}`), 404);
  }
    
  res.status(200).json({
    success: true,
    data: skill
  });
});

// @desc      Add required skill to a job
// @route     POST /api/v1/jobs/:jobId/skills
// @access    Private
exports.addSkill = asyncHandler(async (req, res, next) => {
  req.body.job = req.params.jobId;

  const job = await Job.findById(req.params.jobId);

  if (!job) {
    return next(
      new ErrorResponse(`No job with the id of ${req.params.jobId}`),
      404
    );
  }

  const skill = await Skill.create(req.body);
    
  res.status(200).json({
    success: true,
    data: skill
  });
});

// @desc      Update skill
// @route     PUT /api/v1/skills/:id
// @access    Private
exports.updateSkill = asyncHandler(async (req, res, next) => {
  let skill = await Skill.findById(req.params.id);

  if (!skill) {
    return next(
      new ErrorResponse(`No skill with the id of ${req.params.id}`),
      404
    );
  }

  skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
    
  res.status(200).json({
    success: true,
    data: skill
  });
});

// @desc      Delete skill
// @route     DELETE /api/v1/skills/:id
// @access    Private
exports.deleteSkill = asyncHandler(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return next(
      new ErrorResponse(`No skill with the id of ${req.params.id}`),
      404
    );
  }

  await skill.remove();
    
  res.status(200).json({
    success: true,
    data: {}
  });
});