const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: {type: String},
    userId: {type: String},
    username: {type: String},
    postImage: {type: String},
    postText: {type: String},
    timestamp: {type: Date}
});

postSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('posts', postSchema);