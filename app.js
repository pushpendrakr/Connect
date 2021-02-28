const express=require('express')
var app=express();
const db=require('./models')
var bodyparser=require('body-parser')
const passport=require('./passport')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(passport.session())
const { ensureAuthenticated, forwardAuthenticated } = require('./config');
app.post('/api/signup',(req,res)=>{
 db.User.create(req.body)
 .then((user)=>{
     res.json(user);
 })
 .catch((err)=>{
     console.log(err);
 })
})

app.post('/api/login',
  passport.authenticate('local', { successRedirect: '/api/users',
                                   failureRedirect: '/' }));

app.get('/api/users',(req,res)=>{
    db.User.find()
    .then(function(users){ 
        res.status(401).send(users)})
    .catch((err)=>{res.send(err)})
})
app.get('/api/posts',(req,res)=>{
    db.Post.find()
    .then(function(data){
        res.send(data);
    })
})
app.get('/',(req,res)=>{
    res.send("error");
})
app.post('/api/createpost',ensureAuthenticated,(req,res)=>{
    
        db.Post.create({
            title:req.body.title,
            body:req.body.body,
            postedBy:req.user,
        })
        .then((post)=>{res.send(post)})
        .catch((err)=>{res.send(err)})
})

app.listen(8080,()=>{console.log("Server started")});
