const express = require('express');
const router = express.Router();
const petService = require('./pet-service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


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
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    petService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}