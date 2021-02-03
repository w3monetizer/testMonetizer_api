const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');
const connectLocalDB = require('./config/localdb');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
if (process.env.NODE_ENV === 'development') {
  connectDB();
}
if (process.env.NODE_ENV === 'local') {
  connectLocalDB();
}

// Route files
const spreadsheets = require('./routes/spreadsheets');
const jobs = require('./routes/jobs');
const skills = require('./routes/skills');

const app = express();

// Body parser
// app.use(bodyParser({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));  // to allow large base64 blobs //
app.use(express.json());

// Dev logging middleware with morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'local') {
  app.use(morgan('dev'));
}

// File uploading 
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/spreadsheets', spreadsheets);
app.use('/api/v1/jobs', jobs);
app.use('/api/v1/skills', skills);

// Middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
