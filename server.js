const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
var db;
var url = 'mongodb://localhost:27017/PetStory';
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(url,{ useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(err)
    db = database.db('PetStory');
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)
  
      console.log('saved to database')
      res.redirect('/')
    })
  })

app.get('/', function (req, res) {
    res.send('Hello World')
});
