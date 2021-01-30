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

// Prep the list of CSV files to load in the Spreadsheets collection //
const csvFiles = [];
fs.readdirSync(process.env.CSV_DIR).forEach(file => {
  csvFiles.push(file);
});
console.log('CSV Files in CSV_DIR:')
console.log(csvFiles);

var rows = [];
// Read CSV file into JSON using NPM csvtojson //
readCSV = async (csvFile) => {
  rows = [];
  try {
    csvStr = fs.readFileSync(`${__dirname}/_ctxt/csv/${csvFile}`, 'utf-8');
    // console.log('- csvStr from file: ', csvStr);
    await csv({
      noheader:true,
      output: "csv"
    })
      .fromString(csvStr)
      .then((csvRows) => {
        // console.log('- csvRows from csvStr', csvRows);
        rows = JSON.parse(JSON.stringify(csvRows));
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(csvFile, 'read...'.green.inverse);
    // console.log('- rows after Read:\n', rows);
  } catch (err) {
    console.error(err);
  }
}

// Import into DB //
const importData = async (csvFile) => {
  try {
    await readCSV(csvFile);
    await Spreadsheet.create({
      name: csvFile,
      address: '2215 W River Station Rd, Salt Springs, NS B0K 1P0, Canada',
      rows: rows
    });

    console.log(csvFile, 'imported'.green.inverse);
    // process.exit();
  } catch (err) {
    console.error(err);
  }
}

const importCSVs = async () => {
  for (let i = 0; i < csvFiles.length; i++) {
    console.log('Importing: ', csvFiles[i]);
    await importData(csvFiles[i]);
  }
  process.exit();
}

// Delete data //
const deleteData = async () => {
  try {
    await Spreadsheet.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Command args: $ node import -csv, -l list, -d delete // 
if (process.argv[2] === '-csv') { // import data //
  importCSVs();
} else if (process.argv[2] === '-d') {  // delete data //
  deleteData();
} else if (process.argv[2] === '-l') {  // list csv files to import //
  console.log('- csvFiles to import from ', process.env.CSV_DIR, ' :');
  console.log(csvFiles);
  process.exit();
}
