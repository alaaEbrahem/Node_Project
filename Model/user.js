const mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');
var uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require("jsonwebtoken");
const jwtSignPromise = util.promisify(jwt.sign);
const jwtVerifyPromise = util.promisify(jwt.verify);
const jwtKey = "secretKey";
const secretKey=process.env.JWt_SECRET||'hghfgfggfg';
const saltRounds = process.env.SALT_ROUNDS||10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
bcrypt.hash(myPlaintextPassword, saltRounds) .then(hasedPassword=>{

}).catch(err=>{})

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        minlength: 3,
        index: { unique: true },
     
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
        unique: true,
        required: true,
        lowercase: true,
        validate: validator.isEmail,
        index: { unique: true },
    },
    userGroup: {
        type: Number,
        required: true,
        enum:[1,2,2],
        default:2,
    }


}, {
        toJSON: {
            hidden: ['password'],
            transform: true
        }
    },{autoIndex:true}
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
 // function recieve password and check if password true or false on current user
  //each instance of user can call it
  userSchema.method("verifyPassword", async function(password) {
    return bcrypt.compare(password, this.password);
  });
  userSchema.method("generateToken", function() {
    return jwtSignPromise({ id: this._id }, jwtKey, { expiresIn: "4d" });
  });
  userSchema.static("verifyToken", async function(token) {
    const decodded = await jwtVerifyPromise(token, jwtKey);
  
    return this.findById(decodded.id);
  });
const userModel=mongoose.model('User',userSchema);
userSchema.plugin(uniqueValidator);
module.exports=userModel;

