const express = require('express');
const {
  getSkills,
  getSkill,
  addSkill
} = require('../controllers/skills');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSkills).post(addSkill);
router
  .route('/:id')
  .get(getSkill);

module.exports = router;