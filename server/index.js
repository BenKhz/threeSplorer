require('dotenv').config();
const express = require('express')

const PORT = process.env.PORT;

const api = express();

api.use(express.static('./client/dist'));

api.listen(PORT, (err) => {
  !err ? console.log(`Express server listening on ${PORT}!`) : console.log("STARTUP ERROR: ", err)
})