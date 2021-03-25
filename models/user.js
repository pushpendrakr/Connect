var mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types
var userSchema= new mongoose.Schema({
    username:{
        type : String ,
        required : true
    } ,
    email:{
        type : String ,
        required : true
    } ,
    profilepic:{
        type:String,
        default:"uploads\\defautimg.jpeg",
    },
    password:{
        type : String ,
        required : true
    } ,
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
    notification:[{type:Array }]
})
var User=mongoose.model('User',userSchema);
module.exports=User;