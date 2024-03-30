// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const http = require('http');
const { Server } = require('socket.io'); 

const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // 
// };
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

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
