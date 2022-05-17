import mongoose from "./db";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
   
}, { collection: 'users' }
);
export default userSchema