const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Route files
const sheets = require('./routes/sheets');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging middleware with morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/sheets', sheets);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
