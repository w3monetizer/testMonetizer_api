const express = require('express');
const {
  getSkills,
  getSkill,
  addSkill
} = require('../controllers/skills');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSkills);
router
  .route('/:id')
  .get(getSkill)
  .post(addSkill);

module.exports = router;