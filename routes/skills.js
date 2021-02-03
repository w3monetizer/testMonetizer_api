const express = require('express');
const {
  getSkills,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skills');

const Skill = require('../models/Skill');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(advancedResults(Skill, {
      path: 'job',
      select: 'name description'
    }),
    getSkills
  )
  .post(addSkill);

router
  .route('/:id')
  .get(getSkill)
  .put(updateSkill)
  .delete(deleteSkill);

module.exports = router;