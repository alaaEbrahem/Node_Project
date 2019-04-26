const mongoose = require('mongoose');

const validator = require('validator');
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



const User = mongoose.model('User', userSchema);
module.exports = User;


// var user = new User({
//     username: 'bassant',
//     name: 'bassant mohamed',
//     password: "dhdsdnshnn",
//     email: "bfahmy@gmail.com"
// });

// user
//     .save()
//     .then((user) => {
//         console.log('user', user);
//     }, (e) => {
//         console.log('unable to save')
//         console.log(e.message)
//     }
//     )
