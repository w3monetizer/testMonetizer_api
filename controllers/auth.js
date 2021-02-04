const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
// const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });

  // const { name, email, password, role } = req.body;

  // Create user //
  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   role
  // });

  // Send Token and Cookie in response //
  // sendTokenResponse(user, 200, res);
});