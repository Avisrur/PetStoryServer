const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema({
    id: {type: String},
    name: {type: String},
    address: {type: String},
    likes: {type: Number},
    timestamp: {type: Date},
    currentPopulation: {type:Number}
});

parkSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('parks', parkSchema);