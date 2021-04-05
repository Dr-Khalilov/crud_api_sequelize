const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`App Started on port ${port}`);
});
