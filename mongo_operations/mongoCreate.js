'use strict';

const mongoCreate = (collection,event) => {
    const newForm = new collection(event);
    return newForm.save();
}

module.exports = mongoCreate;