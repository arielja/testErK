const express = require('express');
const bodyParser = require('body-parser');
const keyidf="";
const path = ""
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls
app.get(path, (req, res) => {
  res.send({ res });
});
