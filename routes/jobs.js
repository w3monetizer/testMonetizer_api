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
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers //
// const courseRouter = require('./courses');

const router = express.Router();

// Middleware to protect the routes where user must be logged in and authorized //
// const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers //
router.use('/:jobId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getJobsInRadius);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), jobPhotoUpload);

router
  .route('/')
  .get(advancedResults(Job, 'courses'), getJobs)
  .post(protect, authorize('publisher', 'admin'), createJob);

router
  .route('/:id')
  .get(getJob)
  .put(protect, authorize('publisher', 'admin'), updateJob)
  .delete(protect, authorize('publisher', 'admin'), deleteJob);

module.exports = router;