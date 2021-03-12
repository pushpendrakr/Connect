var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const db=require('./models')

passport.serializeUser(function(user,done){
    done(null,user.username)
})
passport.deserializeUser(function(username,done){
    db.User.findOne({
        username:username})
    .then((user)=>{
        if(!user)return done(new error("no such user"))
        return done(null,user)
        
     })
     .catch((err)=>{done(err)})
    })

passport.use(new LocalStrategy(
  
  function(username, password, done) {
    db.User.findOne({ username: username }, function (err, user) {
      if (err) {return done(err); }
      if (!user) {
        return done(null, false, { message: '' });
      }
      if (user.password!==password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
exports=module.exports=passport