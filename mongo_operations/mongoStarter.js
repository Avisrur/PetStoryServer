'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const createUserSchema = (mongoConfig) => {
    const userSchema = new Schema({
        id: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        age: {type: String},
        email: {type: String},
        password: {type: String},
        picture: {type: String}
    });
    return mongoose.model(mongoConfig.userCollectionName, userSchema);
};

const createPetSchema = (mongoConfig) => {
    const petSchema = new Schema({
        id: {type: String},
        name: {type: String}
    });
    return mongoose.model(mongoConfig.petCollectionName, petSchema);
};

const createParkSchema = (mongoConfig) => {
    const parkSchema = new Schema({
        id: {type: String},
        address: {type: String}
    });
    return mongoose.model(mongoConfig.parkCollectionName, parkSchema);
};

const initMongo = async (mongoConfig) => {
    await mongoose.connect(mongoConfig.mongoUri, {useNewUrlParser: true});
    mongoConfig.userCollection = createUserSchema(mongoConfig);
    mongoConfig.petCollection = createPetSchema(mongoConfig);
    mongoConfig.parkCollection = createParkSchema(mongoConfig);
    mongoConfig.conn = true;
};

module.exports = initMongo;