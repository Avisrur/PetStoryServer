const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongo } = require('./mongo_operations');
const app = express();
const mongoStarter = require('./mongo_operations/mongoStarter');
const mongoCreate = require('./mongo_operations/mongoCreate');

let mongodb;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const mongoConfig = {
  conn: false,
  userCollection: null,
  petCollection: null,
  parkCollection: null,
  userCollectionName: "users",
  petCollectionName: "pets",
  parkCollectionName: "park",
  mongoUri: 'mongodb://localhost:27017/PetStory'
};

app.listen(3000, () => {
  mongoStarter(mongoConfig);
  console.log('listening on 3000');
});

// app.listen(3000, () => {
//   connectToMongo().then((db) => {
//     mongodb = db;
//     console.log('listening on 3000');
//   });
// });

app.post('/users', (req, res) => {
  console.log("EVENT");
  console.log(req.body);
  const result = mongoCreate(mongoConfig.userCollection, req.body).then(user => {
    res.status(200).json(user);
  })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  // mongodb.collection('quotes').save(req.body, (err, result) => {
  //   if (err) return console.log(err);

  //   console.log('saved to database');

  //   res.redirect('/');
  // })
});

app.post('/login', (req, res) => {
  let user = req.body;
  logger.info(user);
  if (user.username === 'admin' && user.password === '1234') {
    res.json({ username: user.username });
    return;
  }
  res.status(403).json({ errorMessage: "Username or password is incorrect" });

});

app.post('/addUser', (req, res) => {

});

app.post('/addPet', (req, res) => {

});



app.get('/friends', function (req, res) {

});
