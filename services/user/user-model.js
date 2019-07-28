const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true},
    id: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    age: {type: String},
    email: {type: String},
    password: { type: String, required: true },
    picture: {type: String}
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('users', userSchema);