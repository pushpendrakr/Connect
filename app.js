const express=require('express')
var app=express();
const db=require('./models')
const user=db.user;
const post=db.post;
var bodyparser=require('body-parser')
const passport=require('./passport')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
var session = require('express-session');
var multer  = require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
})
var upload = multer({storage:storage})
app.use('/uploads/',express.static('uploads'))

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
app.get('/api/user1/:userhandle',(req,res)=>{
    db.User.findOne({username:req.params.userhandle})
    .then(user=>{//console.log(user)
        res.send(user)
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
app.put('/api/uploadpic',ensureAuthenticated,upload.single('postimage'),(req,res,next)=>{
    console.log(req.file)
  db.User.findByIdAndUpdate(req.user._id,{$set:{profilepic:req.file.path}},{new:true})
  .then(user=>{
      res.send(user);
  })
  .catch(err=>{
      res.send(err)
  })
})
app.get('/api/posts',(req,res)=>{
    db.Post.find()
    .populate("postedBy","_id username profilepic")
    .populate("comments.postedBy","_id username profilepic")
    .then(function(data){
     res.send(data);
    })                                                                                                                                  
})
app.get('/api/posts/:id',(req,res)=>{console.log("Hello "+req.params.id)
    db.Post.find({_id:req.params.id})
    .populate("postedBy","_id username profilepic")
    .populate("comments.postedBy","_id username profilepic")
    .then(res1=>{
        res.send(res1)
    })
    .catch(err=>{
        res.status(400).json(err);
    })
})
app.get('/api/logout', function(req, res){
    req.logout();
    res.send("logged out")
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
    .populate("postedBy","_id username profilepic")
    .populate("comments.postedBy","_id username profilepic")
    .then(function(data){
     res.send(data);
    })
})
app.get('/api/mypost',ensureAuthenticated,(req,res)=>{
    db.Post.find({postedBy:req.user._id})
    .populate("postedBy","_id username profilepic")
    .sort("-createdAt")
    .then(function(data){
        res.send(data);
    })
})
app.put('/api/like',ensureAuthenticated,(req,res)=>{
    db.Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}},
        {new:true}
    ).populate("postedBy","_id username profilepic")
    .then(function(data){
        res.send(data);
    })
})
app.put('/api/unlike',ensureAuthenticated,(req,res)=>{
    db.Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}},
        {new:true}
    ).populate("postedBy","_id username profilepic")
    .then(function(data){
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
     .populate("comments.postedBy","_id username profilepic")
     .populate("postedBy","_id username")
     .then(function(data){
         res.send(data);
     })
     .catch(res=>{
         res.status(400).json(res)
     })
})
app.get('/api/user',ensureAuthenticated,(req,res)=>{
    res.send(req.user); 
})
app.delete('/api/deletepost/:postid',ensureAuthenticated,(req,res)=>{
    db.Post.findOne({_id:req.params.postid})
    .populate("comments.postedBy","_id username profilepic")
     .populate("postedBy","_id username profilepic")
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
app.get('/api/user/:userhandle',(req,res)=>{
    db.User.findOne({username:req.params.userhandle})
    .then(user=>{//console.log(user)
        db.Post.find({postedBy:user._id})
        .populate("comments.postedBy","_id username profilepic")
        .populate("postedBy","_id username profilepic")
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
