const express = require('express');
const { getSpreadsheets, getSpreadsheet, createSpreadsheet, updateSpreadsheet, deleteSpreadsheet} = require('../controllers/spreadsheets');

const router = express.Router();

router
  .route('/')
  .get(getSpreadsheets)
  .post(createSpreadsheet);

router
  .route('/:id')
  .get(getSpreadsheet)
  .put(updateSpreadsheet)
  .delete(deleteSpreadsheet);

module.exports = router;
