var mongoose=require('mongoose')
mongoose.set('debug',true);
mongoose.connect('mongodb://localhost/mynewdb1');

mongoose.Promise=Promise;
module.exports.User=require('./user.js');
module.exports.Post=require('./posts.js');