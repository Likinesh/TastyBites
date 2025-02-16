import Product from "../Models/Products.js";
import multer from "multer";
import restaurents from "../Models/Restaurents.js";
import path from 'path'
// using multer to save images
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname( file.originalname));
    }
});

const upload = multer({storage:storage});

const addProduct = async(req,res)=>{
    try {
        const {name,price,category,bestseller,description} = req.body;
        const image = req.file? req.file.filename : undefined;

        const id = req.params.id;
        const restro = await restaurents.findById(id);
        if(!restro){
            return res.status(404).json({error:'No restaurent found'});
        }
        const prod = new Product({
            name,price,category,image,bestseller,description,restaurents:restro._id
        });
        const saved = await prod.save();
        
        restro.product.push(saved);
        
        await restro.save();
        
        return res.status(200).json({saved});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }
}

const getProdByRestro = async(req,res) =>{
    try {
        const id = req.params.id;
        const restro = await restaurents.findById(id);
        if(!restro){
            return res.status(404).json({error:'No restaurent found'});
        }
        const restro_name = restro.restaurent_name;
        const products = Product.find({restaurents:id});
        return res.status(200).json({restro_name,products});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }
}

const deleteById = async(req,res)=>{
    try {
        const id= req.params.id;
        const deleteProd = await Product.findByIdAndDelete(id);
        if(!deleteProd){
            return res.status(404).json({error:'No Product Found'});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Internal Server Error'});
    }
};

export default {addProduct:[upload.single('image'),addProduct],getProdByRestro,deleteById}