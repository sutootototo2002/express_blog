var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = new Schema({
    directives:Number,
    menuname:String,
    address:String,
    icon:String,
    pid:String
})