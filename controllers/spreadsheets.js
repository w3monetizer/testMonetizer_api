const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Spreadsheet = require('../models/Spreadsheet');

// @desc        Get all spreadsheets
// @route       GET /api/v1/spreadsheets
// @access      Private
exports.getSpreadsheets = asyncHandler(async (req, res, next) => {
  const spreadsheets = await Spreadsheet.find();

  res.status(200)
    .json({ success: true, count: spreadsheets.length, data: spreadsheets });
});

// @desc        Get single spreadsheet
// @route       GET /api/v1/spreadsheets/:id
// @access      Private
exports.getSpreadsheet = asyncHandler(async (req, res, next) => {
  const spreadsheet = await Spreadsheet.findById(req.params.id);

  if (!spreadsheet) {
    // Mongo formatted object id not in the database
    return next(
      new ErrorResponse(`Spreadsheet not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: spreadsheet });
});

// @desc        Create new spreadsheet
// @route       POST /api/v1/spreadsheets
// @access      Private
exports.createSpreadsheet = asyncHandler(async (req, res, next) => {
    const spreadsheet = await Spreadsheet.create(req.body);

    res.status(201).json({
      success: true,
      data: spreadsheet
    });
});

// @desc        Update spreadsheet
// @route       PUT /api/v1/spreadsheets/:id
// @access      Private
exports.updateSpreadsheet = asyncHandler(async (req, res, next) => {
    const spreadsheet = await Spreadsheet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!spreadsheet) {
      return next(
        new ErrorResponse(`Spreadsheet not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: spreadsheet });
});

// @desc        Delete spreadsheet
// @route       DELETE /api/v1/spreadsheets/:id
// @access      Private
exports.deleteSpreadsheet = asyncHandler(async (req, res, next) => {
  const spreadsheet = await Spreadsheet.findByIdAndDelete(req.params.id);

  if (!spreadsheet) {
    return next(
      new ErrorResponse(`Spreadsheet not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});