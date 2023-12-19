const express = require('express');
require('dotenv').config({ path: './config/.env' });
const app = express();
const port = 3000; 
const p = process.env.PORT;
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(p, () => {
  console.log(`Server running on http://localhost:${p}/`);
});