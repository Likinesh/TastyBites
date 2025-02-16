import mongoose from 'mongoose';

const rest_user= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    restaurents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurents'
    }]
});

const R_user = mongoose.model('R_user',rest_user);
export default R_user;