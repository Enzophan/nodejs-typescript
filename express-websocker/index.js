
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

const webSockets = require('./websockers');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

webSockets(server)