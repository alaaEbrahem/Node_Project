const mongoose = require('mongoose');

const profileSchema= new mongoose.Schema({
    // Photo:{
    //     // data: Buffer,
    //     // contentType: String
    //     type: String,
    // },
    Name:{
        type: String,
        index: { unique: true },
        required: true,
        minlength: 3
    },
    Author:{
        type: String,
    },
    AvgRating:{
        type: String,
    },
    Rating:{
        type: String,
    },
    Shelve:{
        type: String,
        // required: true,
        // enum:['1','2','3'],
        // default:'1',
    },
})

const profile = mongoose.model('Profile', profileSchema);

module.exports=profile;
