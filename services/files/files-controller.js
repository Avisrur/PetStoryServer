const express = require('express');
const router = express.Router();
const filesService = require('./files-service');

let tempImage = "";
// routes
router.post('/', convertToBase64);

module.exports = router;

function convertToBase64(req, res, next) {
    return filesService.convertToBase64(req, res);
}