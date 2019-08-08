const db = require('../../helpers/db');
const Park = db.Park;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Park.find();
}

async function getById(id) {
    return await Park.findById(id);
}

async function create(parkParam) {
    // validate
    if (await Park.findOne({ address : parkParam.address })) {
        throw 'Address "' + parkParam.address + '" is already taken';
    }

    const park = new Park(parkParam);


    // save park
    await park.save();
}

async function update(id, parkParam) {
    const park = await Park.findById(id);

    // validate
    if (!park) throw 'Park not found';
    if (park.address !== parkParam.address && await Park.findOne({ address: parkParam.address })) {
        throw 'Address "' + parkParam.address + '" is already taken';
    }

    // copy parkParam properties to park
    Object.assign(park, parkParam);

    await park.save();
}

async function _delete(id) {
    await Park.findByIdAndRemove(id);
}