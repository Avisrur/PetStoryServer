const express = require('express');
const router = express.Router();
const petService = require('./pet-service');

// routes
router.post('/', create);
router.post('/:userId', addPetToUser);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    petService.create(req.body)
        .then((pet) => res.json(pet))
        .catch(err => {
            console.log(err);
            next(err)
        });
}


function getAll(req, res, next) {
    petService.getAll()
        .then(pets => res.json(pets))
        .catch(err => next(err));
}

function getById(req, res, next) {
    petService.getById(req.params.id)
        .then(pet => pet ? res.json(pet) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    petService.update(req.params.id, req.body)
        .then(() => res.json())
        .catch(err => next(err));
}

function _delete(req, res, next) {
    petService.delete(req.params.id)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function addPetToUser(req, res, next) {
    petService.addPetToUser(req.params.userId, req.params.petId)
        .then(() => res.json({}))
        .catch(err => next(err));
}