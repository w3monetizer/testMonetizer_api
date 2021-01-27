const ErrorResponse = require('../utils/errorResponse');
const Spreadsheet = require('../models/Spreadsheet');

// @desc        Get all spreadsheets
// @route       GET /api/v1/spreadsheets
// @access      Private
exports.getSpreadsheets = async (req, res, next) => {
  try {
    const spreadsheets = await Spreadsheet.find();

    res
      .status(200)
      .json({ success: true, count: spreadsheets.length, data: spreadsheets });
  } catch (err) {
    next(err);
  }
}

// @desc        Get single spreadsheet
// @route       GET /api/v1/spreadsheets/:id
// @access      Private
exports.getSpreadsheet = async (req, res, next) => {
  try {
    const spreadsheet = await Spreadsheet.findById(req.params.id);

    if (!spreadsheet) {
      // Mongo formatted object id not in the database
      return next(
        new ErrorResponse(`Spreadsheet not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: spreadsheet });
  } catch (err) {
    next(err);
  }
}

// @desc        Create new spreadsheet
// @route       POST /api/v1/spreadsheets
// @access      Private
exports.createSpreadsheet = async (req, res, next) => {
  try {
    const spreadsheet = await Spreadsheet.create(req.body);

    res.status(201).json({
      success: true,
      data: spreadsheet
    });
  } catch (error) {
    next(err);
  }
};

// @desc        Update spreadsheet
// @route       PUT /api/v1/spreadsheets/:id
// @access      Private
exports.updateSpreadsheet = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// @desc        Delete spreadsheet
// @route       DELETE /api/v1/spreadsheets/:id
// @access      Private
exports.deleteSpreadsheet = async (req, res, next) => {
  try {
    const spreadsheet = await Spreadsheet.findByIdAndDelete(req.params.id);

    if (!spreadsheet) {
      return next(
        new ErrorResponse(`Spreadsheet not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
}