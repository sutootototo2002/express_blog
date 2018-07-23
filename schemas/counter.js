var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://120.78.229.228:27017/blog');
var Schema = mongoose.Schema;
var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
    });
    module.exports = CounterSchema;


