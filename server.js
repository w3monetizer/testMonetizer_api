const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/sheets', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all sheets' });
});

app.get('/api/v1/sheets/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Show spreadsheet ${req.params.id}` });
});

app.post('/api/v1/sheets', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new spreadsheet' });
});

app.put('/api/v1/sheets/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Update spreadsheet ${req.params.id}` });
});

app.delete('/api/v1/sheets/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Delete spreadsheet ${req.params.id}` });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
