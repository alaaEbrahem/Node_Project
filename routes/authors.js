var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const authormodel = require('./../Model/author');


router.get('/listing', function (req, res, next) {
    authormodel.find((err, data) => {
        res.send(data)
    })
});


router.get('/create', (req, res) => {
    res.send('createِAuthor')
})



router.post('/create', (req, res, next) => {
    const author = new authormodel(req.body)
    author
        .save()
        .then(author => res.send(author))
        .catch(err => next(createError(400, err.message)));
});



router.patch('/:Id', (req, res, next) => {
    authormodel
        .findByIdAndUpdate(req.params.Id, req.body, { new: true })
        .then(author => res.send(author))
        .catch(err => next(createError(400, err.message)))
});

router.delete('/:Id', (req, res, next) => {
    authormodel
        .findByIdAndDelete(req.params.Id)
        .then(author => res.send(author))
        .catch(err => next(createError(400, err.message)))
});

router.get('/listById/:Id', (req, res, next) => {
    authormodel
        .findById(req.params.Id)
        .then(author => res.send(author))
        .catch(err => next(createError(404, err.message)));
})


module.exports = router;
