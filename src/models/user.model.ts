import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema({
    firstname:String, 
    lastname:String, 
    mobile_number:Number, 
    email:String, 
    password:String,
});

const Users = mongoose.model('users', userSchema);
export default Users

