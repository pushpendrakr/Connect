if(process.env.NODE_ENV==='production'){
module.exports = require('./prod1.js')
}
else {
    module.exports=require('./dev1.js')
}