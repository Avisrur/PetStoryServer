const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema({
    id: {type: String},
    name: {type: String},
    type: {type: String},
    picture: {type: String},
    userId: {type: String}
});

filesSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('files', filesSchema);