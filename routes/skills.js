const express = require('express');
const {
  getSkills,
  getSkill
} = require('../controllers/skills');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSkills);
router.route('/:id').get(getSkill);

module.exports = router;