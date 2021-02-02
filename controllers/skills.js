const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Skill = require('../models/Skill');

// @desc      Get skills
// @route     GET /api/v1/skills
// @route     GET /api/v1/jobs/:jobId/skills
// @access    Public
exports.getSkills = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.jobId) {  // Check if there is a jobId in the request
    query = Skill.find({ job: req.params.jobId })
  } else {
    // res.status(200).json(res.advancedResults);
    query = Skill.find().populate({
      path: 'job',
      select: 'name description'
    });
  }

  const skills = await query;
  res.status(200).json({
    success: true,
    count: skills.length,
    data: skills
  });
})