const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const dbUrl=process.env.MONGO_URL||'mongodb://localhost/goodreads';
//const dbUrl='mongodb+srv://alaa:Aa0987123@cluster0-iorrg.mongodb.net/test?retryWrites=true';
mongoose.connect(dbUrl, {
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
