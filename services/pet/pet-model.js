const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    id: {type: String},
    name: {type: String},
    picture: {type: String}
});

petSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('pets', petSchema);