const express = require('express');
const {
  getSkills,
  getSkill,
  addSkill,
  updateSkill
} = require('../controllers/skills');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSkills).post(addSkill);

router
  .route('/:id')
  .get(getSkill)
  .put(updateSkill);

module.exports = router;