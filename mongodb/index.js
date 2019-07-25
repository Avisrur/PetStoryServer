const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/PetStory';

let db;
function connectToMongo() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url,{ useNewUrlParser: true }, (err, database) => {
            if (err) reject(err);
    
            resolve(database.db('PetStory'));
        });
    })
}



module.exports = {connectToMongo};