const express = require('express');
const router = express.Router();
const userService = require('./user-service');

// routes
router.post('/login', login);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.delete('/user/:userId/pet/:petId', _deletePet);
router.delete('/user/:userId/userToUnfollow/:userIdToUnfollow', _deleteFollow);
router.get('/user/:username', getAllMatchedUsers);

module.exports = router;

function login(req, res, next) {
    userService.login(req.body)
        .then(user => {
            if(user){
                res.json(user)
             } else { res.status(400).json({ message: 'Username or password is incorrect' })
            }
        })
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err)
        });
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getAllMatchedUsers(req, res, next) {
    userService.getAllMatchedUsers(req.params.username)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteFollow(req, res, next) {
    userService.deleteFollow(req.params.userId, req.params.userIdToUnfollow)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deletePet(req, res, next) {
    userService.deletePet(req.params.userId, req.params.petId)
        .then(() => res.json({}))
        .catch(err => next(err));
}