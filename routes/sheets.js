const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all sheets' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Show spreadsheet ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new spreadsheet' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Update spreadsheet ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Delete spreadsheet ${req.params.id}` });
});

module.exports = router;
