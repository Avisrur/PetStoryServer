const db = require('../../helpers/db');
const Post = db.Post;
const Park = db.Park;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const posts = await Post.find().sort('-timestamp');
    const parks = await Park.find().sort('-timestamp');
    return {posts: posts, parks: parks};
}

async function getById(id) {
    return await Post.findById(id);
}

async function create(postParam) {

    const post = new Post(postParam);


    // save post
    await post.save();
}

async function update(id, postParam) {
    const post = await Post.findById(id);

    // validate
    if (!post) throw 'Post not found';
    // copy postParam properties to post
    Object.assign(post, postParam);

    await post.save();
}

async function _delete(id) {
    await Post.findByIdAndRemove(id);
}