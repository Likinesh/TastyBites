import mongoose from 'mongoose';

const restaurent_schema = new mongoose.Schema({
    restaurent_name:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true,
    },
    category:{
        type:[{
            type:String,enum:['veg','non-veg']
        }]
    },
    region:{
        type:[{
            type:String,enum:['south-indian','north-indian','chinese','cakes']
        }]
    },
    offers:{
        type:String,
    },
    image:{
        type:String
    },
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'R_user'
    }],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    }]
});

const restaurents = mongoose.model('restaurents',restaurent_schema);
export default restaurents;