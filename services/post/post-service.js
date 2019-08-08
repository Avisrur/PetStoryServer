const db = require('../../helpers/db');
const Post = db.Post;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Post.find();
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
    if (post.address !== postParam.address && await Post.findOne({ address: postParam.address })) {
        throw 'Address "' + postParam.address + '" is already taken';
    }

    // copy postParam properties to post
    Object.assign(post, postParam);

    await post.save();
}

async function _delete(id) {
    await Post.findByIdAndRemove(id);
}