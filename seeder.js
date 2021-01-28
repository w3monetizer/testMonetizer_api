const fs = require('fs');
const csv = require('csvtojson');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars //
dotenv.config({ path: './config/config.env' });

// Load models //
const Spreadsheet = require('./models/Spreadsheet');
// const Course = require('./models/Course');
// const User = require('./models/User');

// Connect to DB //
mongoose.connect(process.env.LOCAL_MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

var rows = [];
// Read CSV files into JSON using NPM csvtojson //
readCSV = async () => {
  try {
    // csvStr = await csv().fromFile(`${__dirname}/_data/test.csv`);
    csvStr = fs.readFileSync(`${__dirname}/_data/AICamper-Sheet1.csv`, 'utf-8');
    console.log('- csvStr from file: ', csvStr);
    await csv({
      noheader:true,
      output: "csv"
    })
      .fromString(csvStr)
      .then((csvRows) => {
        console.log('- csvRows from csvStr', csvRows);
        rows = JSON.parse(JSON.stringify(csvRows));
      });
    console.log('CSV file Read...'.green.inverse);
    console.log('- rows after Read:\n', rows);
  } catch (err) {
    console.error(err);
  }
}

// const spreadsheet = JSON.parse(fs.readFileSync(`${__dirname}/_data/spreadsheets.json`, 'utf-8'));
// const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

// Import into DB //
const importData = async () => {
  try {
    await readCSV();
    console.log('- rows before insert:\n', rows);
    await Spreadsheet.create({
      name: 'AICamper-Sheet1',
      address: '679 Old Coach Road, Salt Springs, Nova Scotia, Canada',
      rows: rows
    });
    // await Course.create(courses);
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
    await Spreadsheet.deleteMany();
    // await Course.deleteMany();
    // await User.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Command args: $ node seeder -i = import or -d = delete // 
if (process.argv[2] === '-i') { // import data //
  // readCSV();
  importData();
} else if (process.argv[2] === '-d') {  // delete data //
  deleteData();
}