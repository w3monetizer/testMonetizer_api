const express = require('express');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getJobsInRadius,
  jobPhotoUpload
} = require('../controllers/jobs');

const Job = require('../models/Job');
// const advancedResults = require('../middleware/advancedResults');

// Include other resource routers //
// const skillRouter = require('./skills');

const router = express.Router();

// Middleware to protect the routes where user must be logged in and authorized //
// const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers //
// router.use('/:jobId/skills', skillRouter);

router.route('/radius/:zipcode/:distance').get(getJobsInRadius);

// router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), jobPhotoUpload);

router
  .route('/')
  .get(getJobs)
  .post(createJob)
//  .get(advancedResults(Job, 'skills'), getJobs)
//  .post(protect, authorize('publisher', 'admin'), createJob);

router
  .route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob)
  // .put(protect, authorize('publisher', 'admin'), updateJob)
  // .delete(protect, authorize('publisher', 'admin'), deleteJob);

module.exports = router;