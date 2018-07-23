var mongoose = require('mongoose');
var CounterSchema = require('../schemas/counter'); 
module.exports = mongoose.model('counter',CounterSchema);
