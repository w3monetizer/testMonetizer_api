// @desc        Get all spreadsheets
// @route       GET /api/v1/sheets
// @access      Private
exports.getSheets = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all sheets'});
}

// @desc        Get single spreadsheet
// @route       GET /api/v1/sheets/:id
// @access      Private
exports.getSheet = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show spreadsheet ${req.params.id}` });
}

// @desc        Create new spreadsheet
// @route       POST /api/v1/sheets
// @access      Private
exports.createSheet = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new spreadsheet' });  
}

// @desc        Update spreadsheet
// @route       PUT /api/v1/sheets/:id
// @access      Private
exports.updateSheet = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update spreadsheet ${req.params.id}` });  
}

// @desc        Delete spreadsheet
// @route       DELETE /api/v1/sheets/:id
// @access      Private
exports.deleteSheet = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete spreadsheet ${req.params.id}` });
}