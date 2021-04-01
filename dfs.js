const db=require('./models')
var users=[];

async function dfs(startingid)
{
        var visited = {};
  
      await  DFSUtil(startingid, visited,startingid)
       return users
}
  
function DFSUtil(vert, visited,startingid){

        visited[vert] = true;
        if(vert!==startingid)users.push(vert)
        db.User.findOne({_id:vert})
       .then(user=>{
          
           get_neighbours=user.following
           if(user._id!==startingid){
               console.log(user)
               users.push(user)}
        for (var i in get_neighbours) {
            var get_elem = get_neighbours[i];
            if (!visited[get_elem])
                DFSUtil(get_elem, visited,startingid);
        }
       })
       .catch(err=>{
           console.log(err)
       })

   
   
}

module.exports=dfs