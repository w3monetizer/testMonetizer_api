const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars //
dotenv.config({ path: './config/config.env' });

// Load models //
const Job = require('./models/Job');
// const Skill = require('./models/Skill');
// const User = require('./models/User');

// Connect to DB //
mongoose.connect(process.env.LOCAL_MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
  
// Read JSON files //
const jobs = JSON.parse(fs.readFileSync(`${__dirname}/_data/jobs.json`, 'utf-8'));
// const skills = JSON.parse(fs.readFileSync(`${__dirname}/_data/skills.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

// Import into DB //
const importData = async () => {
  try {
    await Job.create(jobs);
    // await Course.create(skills);
    // await User.create(users);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Delete data //
const deleteData = async () => {
  try {
    await Job.deleteMany();
    // await Skill.deleteMany();
    // await User.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Command args: node seeder -i = import or -d = delete // 
if (process.argv[2] === '-i') { // import data //
  importData();
} else if (process.argv[2] === '-d') {  // delete data //
  deleteData();
} else {
  console.log('// Command args: node seeder -i = import or -d = delete //')
  process.exit();
}
