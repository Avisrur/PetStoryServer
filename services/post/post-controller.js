const express = require('express');
const router = express.Router();
const postService = require('./post-service');

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    postService.create(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err)
        });
}

function getAll(req, res, next) {
    postService.getAll()
        .then(feed => res.json(feed))
        .catch(err => next(err));
}

function getById(req, res, next) {
    postService.getById(req.params.id)
        .then(post => post ? res.json(post) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    postService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    postService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}