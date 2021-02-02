const express = require('express');
const {
  getSkills,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skills');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSkills).post(addSkill);

router
  .route('/:id')
  .get(getSkill)
  .put(updateSkill)
  .delete(deleteSkill);

module.exports = router;