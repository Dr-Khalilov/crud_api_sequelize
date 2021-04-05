const express = require('express');

const router = require('./router');

const app = express();

app.use(express.json());
app.use('/api', router);

app.use((err, req, res, next) => {
  console.log('Error caught: ->>>>>', err);
  if (res.headerSent) {
    return;
  }
  const status = err.status || 500;
  const message = err.message || 'Server error';
  res.status(status).send({ errors: [message] });
});

module.exports = app;
