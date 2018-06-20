var express = require('express');
var router = express.Router();
router.get('/user',function(req,res,next){
   // res.send('amind-User');
   res.render('main/user');
})

module.exports = router;