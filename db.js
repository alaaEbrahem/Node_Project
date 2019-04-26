const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/goodreads', {
    useCreateIndex: true,
    autoIndex:true,
    useNewUrlParser: true
}
,
(err)=>{
    if(err){
        console.error(err);
    }
}
);
