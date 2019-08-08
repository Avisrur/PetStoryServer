const express = require('express');
const router = express.Router();
const parkService = require('./park-service');

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    parkService.create(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err)
        });
}


function getAll(req, res, next) {
    parkService.getAll()
        .then(parks => res.json(parks))
        .catch(err => next(err));
}

function getById(req, res, next) {
    parkService.getById(req.params.id)
        .then(park => park ? res.json(park) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    parkService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    parkService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}