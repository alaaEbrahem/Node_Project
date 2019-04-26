var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const usermodel = require('./../Model/user');

/* GET users listing. */

router.get('/listing', function (req, res, next) {
  usermodel.find((err, data) => {
    res.send(data)
  })
});


router.get('/create', (req, res) => {
  res.send('createUser')
})



router.post('/create', (req, res, next) => {
  const user = new usermodel(req.body)
  user
    .save()
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)));
});



router.patch('/:Id', (req, res, next) => {
  usermodel
    .findByIdAndUpdate(req.params.Id, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)))
});

router.delete('/:Id', (req, res, next) => {
  usermodel
    .findByIdAndDelete(req.params.Id)
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)))
});

router.get('/listById/:Id', (req, res, next) => {
  usermodel
    .findById(req.params.Id)
    .then(u => res.send(u))
    .catch(err => next(createError(404, err.message)));
})


module.exports = router;
