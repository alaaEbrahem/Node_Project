const mongoose = require('mongoose');

const validator = require('validator');
const categorySchema = new mongoose.Schema({

    Name: {
        type: String,
        index: { unique: true },
        required: true,
        minlength: 3
    }
}, 
    {autoIndex:true}
   
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
