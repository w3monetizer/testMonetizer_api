const express = require('express');
const { getSheets, getSheet, createSheet, updateSheet, deleteSheet} = require('../controllers/sheets');

const router = express.Router();

router
  .route('/')
  .get(getSheets)
  .post(createSheet);

router
  .route('/:id')
  .get(getSheet)
  .put(updateSheet)
  .delete(deleteSheet);

module.exports = router;
