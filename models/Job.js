const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlenght: [50, 'Name can not be more than 50 characters']
  },
  slug: String, // Url friendly version of the name - with slugify
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlenght: [500, 'Description can not be more than 500 characters']
  },
  website: {
    type: String,
    match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating must can not be more than 10']
  },
  averageCost: Number,
  photo: {
    type: String,   // the name of the file
    default: 'no-photo.jpg'
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {  // Enable virtuals / reverse populate / related data extracted from other collections //
    toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create job slug from the name
JobSchema.pre('save', function(next) {  // use function() required for this to refer to the doc, eg: this.slug
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field
JobSchema.pre('save', async function (next) {  // this refers to the document / db record 
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

// Cascade delete skills when a job is deleted // 
JobSchema.pre('remove', async function (next) {
  console.log(`Skills being removed from job ${this._id}`);
  await this.model('Skill').deleteMany({ job: this._id });
  next();
});

// Reverse populate with virtuals //
JobSchema.virtual('skills', {
  ref: 'Skill',
  localField: '_id',
  foreignField: 'job',
  justOne: false    // to get the array of skills for the job //
});

module.exports = mongoose.model('Job', JobSchema);