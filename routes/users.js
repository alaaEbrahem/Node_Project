var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const usermodel = require('./../Model/user');
const auth = require("../middlewares/authentication");

/* GET users listing. */

router.get('/', function (req, res, next) {
  usermodel.find((err, data) => {
    res.send(data)
  })
});
//login
router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  const currentUser = await usermodel.findOne({ username });
  if (!currentUser) return next(createError(401)); // return keyword is important to break fun
  const passwordMatch = await currentUser.verifyPassword(password);
  if (!passwordMatch) return next(createError(401)); // return keyword is important
  const token = await currentUser.generateToken();
  res.send({ profile: currentUser, token });
});

router.post('/', (req, res, next) => {
  const user = new usermodel(req.body)
  user.save()
    .then(user => res.send(user))
    .catch(err => next(createError(400, err.message)));
});
//athentication on ather routes
router.use(auth)

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
