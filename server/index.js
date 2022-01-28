require('dotenv').config();
const express = require('express')

const PORT = process.env.PORT || 3000;

const api = express();

api.use(express.static('./client/dist'));

api.listen(PORT, (err) => {
  console.log(!err ? `Express server listening on ${PORT}!` : `ERROR: ${err}`)
})