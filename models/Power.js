var mongoose = require('mongoose');
const { autoIncrement } = require( 'mongoose-plugin-autoinc');
mongoose.connect('mongodb://127.0.0.1:27017/blog',function(err){
    if(err){
              console.log('数据库连接失败');
            }else{
              console.log('数据库连接成功');
            }
})

var usersSchema = require('../schemas/user');

usersSchema.plugin(autoIncrement, 'Test');

usersSchema.plugin(autoIncrement, {
    model: 'Test',
    field: 'bookId',
    startAt: 0,
    incrementBy: 1
  });
module.exports = mongoose.model('Test',usersSchema);
