// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
dotenv.config();

const app = express();
// const corsOptions = {
//   origin: 'http://your-allowed-origin.com',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // cho phép sử dụng cookie, token,...
// };

app.use(cors());

app.use(bodyParser.json());
routes(app);

mongoose.connect(`${process.env.Mongo_DB}`, {
  dbName: 'Keyhub',
  user: 'Baboga12',
  pass: 'DWtxXsixg7KtOun0',
}).then(() => {
  console.log('Connected to Mongo');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
