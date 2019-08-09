const express = require('express');
const app = express();
// let multer = require('multer');
// let GridFsStorage = require('multer-gridfs-storage');
// let Grid = require('gridfs-stream');  check if image upload possible
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error-handler');
// const http = require('http').Server(app);
// const io = require('socket.io')(http);  for trying to make feed real time

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

// global error handler


app.use('/users', require('./services/user/user-controller'));
app.use('/pets', require('./services/pet/pet-controller'));
app.use('/parks', require('./services/park/park-controller'));
app.use('/posts', require('./services/post/post-controller'));

app.use(errorHandler);

const server = app.listen(3000, function () {
  console.log('Server listening on port ' + 3000);
});
