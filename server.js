const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());
const errorHandler = require('./helpers/error-handler');


const serverIO = require('http').Server(app);
const io = require('socket.io')(serverIO);
const postService = require('./services/post/post-service');
// io.origins('localhost:4200 http://localhost:4200 https://localhost:4200');

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('new-post', (post) => {
    postService.create(post);
  });
});


app.use('/users', require('./services/user/user-controller'));
app.use('/pets', require('./services/pet/pet-controller'));
app.use('/parks', require('./services/park/park-controller'));
app.use('/posts', require('./services/post/post-controller'));

app.use(errorHandler);

serverIO.listen(3001,  () => {
  console.log('serverIO listenining on port 3001')
});

const server = app.listen(3000, function () {
  console.log('Server listening on port ' + 3000);
});
