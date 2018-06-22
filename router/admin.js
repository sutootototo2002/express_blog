var express = require('express');
var router = express.Router();
router.get('/user',function(req,res,next){
   // res.send('amind-User');
   console.log(req.userInfo._id);
   res.render('main/user',{
       userInfo:req.userInfo
   });
})

module.exports = router;