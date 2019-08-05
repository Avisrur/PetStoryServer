const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PetStory',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../services/user/user-model'),
    Pet: require('../services/pet/pet-model'),
    Park: require('../services/park/park-model'),
};