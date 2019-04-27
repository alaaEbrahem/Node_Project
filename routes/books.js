var express = require('express');
var router = express.Router();
const createError = require('http-errors');


const bookModel = require('../Model/book');
const Author = require('../Model/author');
const Category = require('../Model/category');

router.get('/',  (req, res, err) => {
    debugger
        bookModel.find({})
            .then(books=>res.send(books))
            .catch(err=>next(createError(500,err.message)))
});

router.post('/', /*async*/(req, res, next) => {
    debugger
    /*await*/ bookModel.create(req.body)
        .then(msgs => res.send("done"))
        .catch(err => next(createError(400, err.message)))
});

router.patch('/:id', function (req, res, next) {
    debugger
    bookModel.findByIdAndUpdate(req.params.id, req.body)
        .then(msgs => res.send("Updated"))
        .catch(err => next(createError(500, err.message)));
});

router.delete('/:id', function (req, res, next) {
    debugger
    bookModel.findByIdAndDelete(req.params.id)
        .then(msgs => res.send('deleted'))
        .catch(err => next(createError(500, err.message)));
});
module.exports = router;