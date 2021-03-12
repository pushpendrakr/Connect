const express=require('express')
var app=express();
const db=require('./models')
var bodyparser=require('body-parser')
const passport=require('./passport')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
var session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
   
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  const { ensureAuthenticated, forwardAuthenticated } = require('./config');

app.post('/api/signup',(req,res)=>{
 
    db.User.findOne({username:req.body.username})
    .then(user=>{
        if(user)
        res.status(400).json("User Already exist")
        else{
            db.User.create(req.body)
            .then((user)=>{
                res.json(user);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    })
  

})

app.post('/api/login', (req, res, next) => {
    let error={
    };
    passport.authenticate("local", (err, user, info) => {
       
      if (err){
          throw err;
        }
      if (!user){
         
          if(info.message=="Incorrect password.")
         error.password="Incorrect password"
         else error.username="No such user"
      res.status(400).json(error);
    }
      else {
        req.logIn(user, (err) => {
          if (err) {console.log(err.response.data)
              res.status(400).json(err)
          }
          res.send(req.user);
        });
      }
    })(req, res, next);
  });
app.get('/api/isLoggedIn',(req,res)=>{
    if(req.isAuthenticated()){
    
    res.status(200).json(1);}
    else res.status(400).json(0);
})
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
app.get('/api/logout', function(req, res){
    req.logout();
  });
app.get('/',(req,res)=>{
    res.send("Welcome");
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
app.get('/api/getpost',(req,res)=>{
    db.Post.find()
    .populate("postedBy","_id username")
    .populate("comments.postedBy","_id username")
    .then(function(data){
     res.send(data);
    })
})
app.get('/api/mypost',ensureAuthenticated,(req,res)=>{
    db.Post.find({postedBy:req.user._id})
    .populate("postedBy","_id username")
    .sort("-createdAt")
    .then(function(data){
        res.send(data);
    })
})
app.put('/api/like',ensureAuthenticated,(req,res)=>{
    db.Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}},
        {new:true}
    ).then(function(data){
        res.send(data);
    })
})
app.put('/api/unlike',ensureAuthenticated,(req,res)=>{
    db.Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}},
        {new:true}
    ).then(function(data){
        res.send(data);
    })
})
app.put('/api/comments',ensureAuthenticated,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
     db.Post.findByIdAndUpdate(req.body.postId,{
         $push:{comments:comment}},
        {new:true}
     )
     .populate("comments.postedBy","_id username")
     .populate("postedBy","_id username")
     .then(function(data){
         res.send(data);
     })
})
app.get('/api/user',ensureAuthenticated,(req,res)=>{
    res.send(req.user);
})
app.delete('/api/deletepost/:postid',ensureAuthenticated,(req,res)=>{
    db.Post.findOne({_id:req.params.postid})
    .populate("postedBy","_id username")
    .then(function(data){
      //  console.log(data);
        if(!data){
            res.send({message:"Post not found"});
        }
        if(data.postedBy._id.toString()===req.user._id.toString()){
            db.Post.remove()
            .then(function(data){
                res.send({message:"Post Deleted"});
            })
            .catch(function(err){res.send(err)});
        }
    })
    .catch(err=>{res.send(err)});
})
app.get('/api/user/:userid',ensureAuthenticated,(req,res)=>{
    db.User.findOne({_id:req.params.userid})
    .then(user=>{
        db.Post.find({postedBy:req.params.userid})
        .populate("postedBy","_id username")
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{res.send(err)});
    })
})
app.put('/api/follow',ensureAuthenticated,(req,res)=>{
    db.User.findByIdAndUpdate(req.user._id,{
        $push:{following:req.body.id}
     },{new:true} 
     )
     .then(data=>{console.log(data);
         db.User.findByIdAndUpdate(req.body.id,{
             $push:{follower:req.user._id}},{new:true})
             .then(data1=>{console.log(data1);
                console.log(data1.username);
                res.send({message:"You are now following "+data1.username})
            })
         })
        
         .catch(err=>{res.send(err)});
     })
     app.put('/api/unfollow',ensureAuthenticated,(req,res)=>{
        db.User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.id}
         },{new:true} 
         )
         .then(data=>{console.log(data);
             db.User.findByIdAndUpdate(req.body.id,{
                 $pull:{follower:req.user._id}},{new:true})
                 .then(data1=>{//console.log(data1);
                    //console.log(data1.username);
                    res.send({message:"You unfollowed "+data1.username})
                })
             })
            
             .catch(err=>{res.send(err)});
         })


app.post('/api/search',(req,res)=>{
    const exp=new RegExp("^"+req.body.query);
db.User.find({username:{$regex:exp}})
.then(data=>{
    res.send(data);
})
.catch(err=>{res.send(err)})

})
app.listen(8080,()=>{console.log("Server started")});
