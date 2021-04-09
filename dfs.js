function helper(alluser,id1){
   
    for(var i in alluser){
        var h=alluser[i]
         
        if(h._id.equals(id1))return h;
    }
    return null
}


function dfs(startingid,allusers){
  
        var visited = {};
        var q = [];
        var startingNode=startingid
        visited[startingid] = true;
        q.push(startingNode);
        let users=[]
        let usersid=[]
        var m=helper(allusers,startingid)
        while (q.length>0) {
           
            var getQueueElement = q.shift();
       
           var u=helper(allusers,getQueueElement)
          if(!(m.following.includes(u._id))){
              if(!(u._id.equals(m._id)))
            users.push(u)
            usersid.push(u._id)
        }
           get_List=u.following
           for (var i in get_List) {
               var neigh = get_List[i];

               if (!visited[neigh]) {
                   visited[neigh] = true;
                   q.push(neigh);
              
               }
           }
        }
       
         if(users.length<5){
             for(var i in allusers){
                 var h=allusers[i];
               if(!(usersid.includes(h._id))){
                if(!(m.following.includes(h._id))){
                   users.push(h);}
                   
               }
               console.log(i+" "+h)
               if(users.length>=5)return users;
             }
         }
        
   return users
}

module.exports=dfs