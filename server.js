const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const bodyParser = require('body-parser');

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

const app = express();

// Body parser
app.use(bodyParser({limit: '50mb'}));
app.use(express.json());

// Dev logging middleware with morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'local') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/spreadsheets', spreadsheets);

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
