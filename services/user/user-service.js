const db = require('../../helpers/db');
const asyncForEach = require('../../helpers/utility');
const User = db.User;
const Pet = db.Pet;

module.exports = {
    login,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    deletePet,
    getAllMatchedUsers,
    deleteFollow
};

async function login(user) {
    const userResult = await User.findOne({ username: user.username });
    if (userResult) {
        if (user.password == userResult.password) {

            const pets = await convertIdToObject(userResult.pets, Pet);
            const following = await convertIdToObject(userResult.following, User);

            Object.assign(userResult.pets, pets);
            Object.assign(userResult.following, following);
            //userResult.pets = pets;
            return userResult;
        }
    }
}

async function getAll() {
    const users = await User.find();
    let filledUsers = []
    await asyncForEach(users, async (user, index) => {
        const pets = await convertIdToObject(user.pets, Pet);
        const following = await convertIdToObject(user.following, User);
        Object.assign(user.following, following);
        Object.assign(user.pets, pets);

        //filledUsers.push(user);
    });

    return users;
}

async function getAllMatchedUsers(username) {
    let users = await getAll();

    return {
        users: users.filter(user => {
            return user.username.toLowerCase().includes(username)
                || user.firstName.toLowerCase().includes(username)
                || user.lastName.toLowerCase().includes(username)
                || (user.firstName + ' ' + user.lastName).toLowerCase().includes(username)
                || (user.lastName + ' ' + user.firstName).toLowerCase().includes(username);
        })
    };

}

async function getById(id) {
    const user = await User.findById(id);
    const pets = await convertIdToObject(user.pets, Pet);

    const following = await convertIdToObject(user.following, User);
    Object.assign(user.following, following);
    Object.assign(user.pets, pets);
    return user;
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    user.pets = [];
    user.following = [];

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
    const pets = await convertIdToObject(user.pets, Pet);

    const following = await convertIdToObject(user.following, User);
    Object.assign(user.following, following);
    Object.assign(user.pets, pets);
    return user;
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function deleteFollow(userId, userIdToUnfollow) {
    const user = await User.findById(userId);

    for (let i = 0; i < user.following.length; i++) {
        if (user.following[i] === userIdToUnfollow) {
            user.pets.splice(i, 1);
            break;
        }
    }

    return await user.save()
}

async function deletePet(userId, petId) {
    const user = await User.findById(userId);

    for (let i = 0; i < user.pets.length; i++) {
        if (user.pets[i] === petId) {
            user.pets.splice(i, 1);
            break;
        }
    }

    return await user.save()
}

async function convertIdToObject(fromArray, collection) {

    if (fromArray && fromArray.length > 0) {
        const allObjectsArray = [];
        await asyncForEach(fromArray, async (id) => {
            const obj = await collection.findById(id);
            if (obj) {
                allObjectsArray.push(obj.toJSON());
            }

        });

        return allObjectsArray;
    }

    return [];
}