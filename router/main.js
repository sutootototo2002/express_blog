var express = require('express');
var router = express.Router();
router.get('/',function(req,res,next){
    return res.send('首页');
})

module.exports = router;