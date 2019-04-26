const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        minlength: 3
    }
    ,
    lastname: {
        type: String,
        required: true,
        minlength: 3
    },
    birthdate:{
        type: Date
    }

}
);

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;


// var author = new Author({
    // firstname:"bassant",
    // lastname:"mohamed",
    // birthdate:"02-03-1995"
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
