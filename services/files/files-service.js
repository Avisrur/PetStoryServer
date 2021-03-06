const db = require('../../helpers/db');
const IncomingForm = require('formidable').IncomingForm;
var fs = require('fs');
const Pet = db.Pet;
const User = db.User;

module.exports = {
    convertToBase64
};

function convertToBase64(req, res){
    const form = new IncomingForm();
    let base64Image = "";
    let fileType;
    form.on('file', (field, file) => {
        base64Image = base64_encode(file.path);
        fileType = file.type;
        
    });

    form.on('end', () => {
        res.json('data:' + fileType + ';base64,' + base64Image);
    });

    form.parse(req);
}

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}