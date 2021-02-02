const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a skill title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add a number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scolarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job',
    required: true
  }
});

// Static method to get avg of skill/course tuitions
SkillSchema.statics.getAverageCost = async function (jobId) {
  
}

// Call getAverageCost after save
SkillSchema.post('save', function () {
  
});

// Call getAverageCost after save
SkillSchema.pre('remove', function () {
  
});

module.exports = mongoose.model('Skill', SkillSchema);
