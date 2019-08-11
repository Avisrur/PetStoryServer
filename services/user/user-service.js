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
    delete: _delete
};

async function login(user) {
    const userResult = await User.findOne({ username: user.username });
    if (userResult) {
        if (user.password == userResult.password) {

            const pets = await convertIdToObject(userResult.pets, Pet);

            Object.assign(userResult.pets, pets);
            //userResult.pets = pets;
            return userResult;
        }
    }
}

async function getAll() {
    const users = await User.find();
    await asyncForEach(users, async () => {
        const pets = await convertIdToObject(user.pets, Pet);
        user.pets = pets;
    });

    return users;
}

async function getById(id) {
    const user = await User.findById(id);
    const pets = await convertIdToObject(user.pets, Pet);

    user.pets = pets;
    return user;
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    user.pets = [];
    user.friends = [];

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
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function convertIdToObject(fromArray, collection){

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