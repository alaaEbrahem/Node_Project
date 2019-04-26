var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const categoryModel = require('./../Model/category');

/* GET users listing. */

router.get('/', function (req, res, next) {
    categoryModel.find((err, data) => {
    res.send(data)
  })
});


router.get('/create', (req, res) => {
  res.send('createCategory')
})



router.post('/create', (req, res, next) => {
  const category = new categoryModel(req.body)
  category
    .save()
    .then(category => res.send(category))
    .catch(err => next(createError(400, err.message)));
});

router.patch('/:Id', (req, res, next) => {
  categoryModel
    .findByIdAndUpdate(req.params.Id, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)))
});

router.delete('/:Id', (req, res, next) => {
  categoryModel
    .findByIdAndDelete(req.params.Id)
    .then(c => res.send(c))
    .catch(err => next(createError(400, err.message)))
});

router.get('/:Id', (req, res, next) => {
  categoryModel
    .findById(req.params.Id)
    .then(c => res.send(c))
    .catch(err => next(createError(404, err.message)));
})


module.exports = router;
