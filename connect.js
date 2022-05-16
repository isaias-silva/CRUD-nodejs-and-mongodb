const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/banco_new');
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
   
}, { collection: 'users' }
);



module.exports={mongoose:mongoose,userSchema:userSchema}