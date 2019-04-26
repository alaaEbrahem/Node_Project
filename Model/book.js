const mongoose = require('mongoose');

const bookSchema= new mongoose.Schema({
    // Photo:{
    //     data: Buffer,
    //     contentType: String
    // },
    Name:{
        type: String,
        index: { unique: true },
        required: true,
        minlength: 3
    },
    CategoryID:{
        type:String
    },
    AuthorID:{
        type:String
    }
})

const books = mongoose.model('Books', bookSchema);

module.exports=books;