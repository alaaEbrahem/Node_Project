var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
var upload = multer({ storage: storage }).single('Image');
router.post('/', function (req, res) {
    debugger
    upload(req, res, function (err) {
        if (err) {
        }
        res.json({
            message: 'Image uploaded!'
        });
    })
});
module.exports = router;



