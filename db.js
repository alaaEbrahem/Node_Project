const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/goodreads', {
    useCreateIndex: true,
    autoIndex:true,
    useNewUrlParser: true,
}
,
(err)=>{
    if(err){
        console.error(err);
    }
}
);
