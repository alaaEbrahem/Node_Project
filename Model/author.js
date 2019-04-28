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


// var author = new Author({
//     FN:"ali4",
//     LN:"fahmy4",
//     DOB:"02-03-1995"
// });

// author
//     .save()
//     .then((author) => {
//         console.log('author', author);
//     }, (e) => {
//         console.log('unable to save')
//         console.log(e.message);
//     }
//     )
