const Spreadsheet = require('../models/Spreadsheet');

// @desc        Get all spreadsheets
// @route       GET /api/v1/spreadsheets
// @access      Private
exports.getSpreadsheets = async (req, res, next) => {
  try {
    const spreadsheets = await Spreadsheet.find();

    res.status(200).json({ success: true, data: spreadsheets });
  } catch (err) {
    res.status(400).json({ success: false }); 
  }
}

// @desc        Get single spreadsheet
// @route       GET /api/v1/spreadsheets/:id
// @access      Private
exports.getSpreadsheet = async (req, res, next) => {
  try {
    const spreadsheet = await Spreadsheet.findById(req.params.id);

    if (!spreadsheet) {
      return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: spreadsheet });
  } catch (err) {
    res.status(400).json({ success: false }); 
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
    res.status(400).json({ success: false});
  }
};

// @desc        Update spreadsheet
// @route       PUT /api/v1/spreadsheets/:id
// @access      Private
exports.updateSpreadsheet = async (req, res, next) => {
  const spreadsheet = await Spreadsheet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!spreadsheet) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: spreadsheet });
};

// @desc        Delete spreadsheet
// @route       DELETE /api/v1/spreadsheets/:id
// @access      Private
exports.deleteSpreadsheet = async (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete spreadsheet ${req.params.id}` });
}