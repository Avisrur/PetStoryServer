const express = require('express');
const bodyParser= require('body-parser');
const {connectToMongo} = require('./mongodb');
const app = express();

let mongodb;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.listen(3000, () => {
  connectToMongo().then((db) => {
    mongodb = db;
    console.log('listening on 3000');
  });
});

app.post('/quotes', (req, res) => {
  mongodb.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
  
    console.log('saved to database');

    res.redirect('/');
  })
});

app.post('/addUser', (req, res) => {

});

app.post('/addPet', (req, res) => {
  
});



app.get('/friends', function (req, res) {
    
});
