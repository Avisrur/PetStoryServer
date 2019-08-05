const db = require('../../helpers/db');
const Pet = db.Pet;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Pet.find();
}

async function getById(id) {
    return await Pet.findById(id);
}

async function create(petParam) {
    // validate
    if (await Pet.findOne({ name : petParam.name })) {
        throw 'Name "' + petParam.username + '" is already taken';
    }

    const pet = new Pet(petParam);


    // save pet
    await pet.save();
}

async function update(id, petParam) {
    const pet = await Pet.findById(id);

    // validate
    if (!pet) throw 'Pet not found';
    if (pet.name !== petParam.name && await Pet.findOne({ name: petParam.name })) {
        throw 'Name "' + petParam.name + '" is already taken';
    }

    // copy petParam properties to pet
    Object.assign(pet, petParam);

    await pet.save();
}

async function _delete(id) {
    await Pet.findByIdAndRemove(id);
}