const express = require('express');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/routes.js');
const app = express();
const cors = require("cors");
const PORT = 3001;
const mongodb = require('./Config/Mongoconfig.js');  

app.use(bodyParser.json());
app.use(cors());
 // In a real-world scenario, use a proper session management solution

app.use('/auth', authRoutes);

const mongo = mongoose.connect(mongodb.url);
mongo.then(
  () => {
    console.log('Mongo_DB Connected Successfully');
  },
  (error) => {
    console.log(
      error,
      'Error, While connecting to Mongo_DB something went wrong'
    );
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => res.send("Welcome"));
module.exports = app;
