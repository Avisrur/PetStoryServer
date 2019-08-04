const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PetStory');
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../services/user/user-model')
};