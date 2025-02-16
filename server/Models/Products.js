import mongoose from "mongoose";

const Prod_schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:[{
            type:String,
            enum:['veg','non-veg']
        }],
    },
    image:{
        type:String,
    },
    bestseller:{
        type:String,
    },
    description:{
        type:String,
    },
    restaurents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurents'
    }]
});

const Product = mongoose.model('products',Prod_schema);
export default Product;