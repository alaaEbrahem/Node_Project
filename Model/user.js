const mongoose = require('mongoose');

const validator = require('validator');
const bcrypt = require('bcrypt');
const util = require('util');


const saltRounds = process.env.SALT_ROUNDS || 9;

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        index: { unique: true },
        required: true,
        lowercase: true,
        minlength: 3
    }
    ,
    name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3
    }
    ,
    password: {
        type: String,
        required: true,
        minlength: 6
    }
    ,
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: { unique: true },
        validate: validator.isEmail
    }


}, {
        toJSON: {
            hidden: ['password'],
            transform: true
        }
    }
);
userSchema.options.toJSON.transform = function (doc, ret, options) {
    if (Array.isArray(options.hidden)) {
        options.hidden.forEach(field => {
            delete ret[field];
        });
    }
    return ret;
};




const hashPassword = (password) => bcrypt.hash(password, saltRounds);
userSchema.pre('save', async function () {
    const currentUser = this;
    if (currentUser.isNew) {
        currentUser.password = await hashPassword(currentUser.password);
    }
})
const User = mongoose.model('User', userSchema);
module.exports = User;
var user = new User({
    username: 'bassant22',
    name: 'bassant moham2ed',
    password: "dhdsdnshnn2",
    email: "bfahmy@gmail2s.com"
});

user
    .save()
    .then((user) => {
        console.log('user', user);
    }, (e) => {
        console.log('unable to save')
        console.log(e.message)
    }
    )
