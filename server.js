const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

// global error handler


app.use('/users', require('./services/user/user-controller'));

app.use(errorHandler);

const server = app.listen(3000, function () {
  console.log('Server listening on port ' + 3000);
});
