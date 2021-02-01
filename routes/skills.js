const express = require('express');
const {
  getSkills
} = require('../controllers/skills');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSkills);

module.exports = router;