const Spreadsheet = require('../models/Spreadsheet');

// @desc        Get all spreadsheets
// @route       GET /api/v1/spreadsheets
// @access      Private
exports.getSpreadsheets = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all sheets'});
}

// @desc        Get single spreadsheet
// @route       GET /api/v1/spreadsheets/:id
// @access      Private
exports.getSpreadsheet = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show spreadsheet ${req.params.id}` });
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
    res.status(400).json({ success: false});
  }
};

// @desc        Update spreadsheet
// @route       PUT /api/v1/spreadsheets/:id
// @access      Private
exports.updateSpreadsheet = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update spreadsheet ${req.params.id}` });  
}

// @desc        Delete spreadsheet
// @route       DELETE /api/v1/spreadsheets/:id
// @access      Private
exports.deleteSpreadsheet = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete spreadsheet ${req.params.id}` });
}