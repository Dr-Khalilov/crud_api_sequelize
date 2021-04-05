const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());
app.use('/api', router);

app.use((err, req, res, next) => {
  console.log('Error caught: ->>>>>', err);
  res.send({ errors: [err.message] });
});

module.exports = app;
