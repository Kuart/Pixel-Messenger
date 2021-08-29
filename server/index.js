const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
