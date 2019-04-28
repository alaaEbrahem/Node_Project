var express = require('express');
var router = express.Router();
const createError=require('http-errors');


const categoryModel=require('../Model/category');

router.get('/',(req,res,err)=>{
  categoryModel.find({})
    .then(categories=>res.send(categories))
    .catch(err=>next(createError(500,err.message)))
    
});

router.post('/', /*async*/(req, res, next)=> {

    /*await*/ categoryModel.create(req.body)
    .then(msgs=>res.send("done"))
    .catch(err=>next(createError(400,err)))
});

router.patch('/:id', function(req, res, next){
    debugger
    categoryModel.findByIdAndUpdate(req.params.id,req.body,{runValidators:true})
    .then(msgs=>res.send("Updated"))
    .catch(err=>next(createError(500,err.message)));
  });

  router.delete('/:id', function(req, res, next){
    debugger
    categoryModel.findByIdAndDelete(req.params.id)
    .then(msgs=>res.send('deleted'))
    .catch(err=>next(createError(500,err.message)));
 });
module.exports = router;