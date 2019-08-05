const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema({
    id: {type: String},
    name: {type: String},
    address: {type: String}
});

parkSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('parks', parkSchema);