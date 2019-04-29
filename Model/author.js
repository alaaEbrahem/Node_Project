const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({

    FN: {
        type: String,
        required: true,
        minlength: 3
    }
    ,
    LN: {
        type: String,
        required: true,
        minlength: 3
    },
    DOB:{
        type: Date
    }

}
);

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;

