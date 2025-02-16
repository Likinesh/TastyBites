import R_user from "../Models/Restaurent_User.js";
import restaurents from "../Models/Restaurents.js";
import multer from "multer";
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
const add_restaurent = async (req, res) => {
    try {
        const { res_name, area, category, region, offer } = req.body;
        const image = req.file?.filename;
        const user = await R_user.findById(req.user_id);

        if (!user) {
            return res.status(400).json({ message: "Vendor not Found" });
        }

        const restro = new restaurents({
            restaurent_name: res_name,
            area,
            category,
            region,
            offers: offer,
            image,
            user: user._id
        });

        const new_restro = await restro.save();
        user.restaurents.push(new_restro);
        await user.save();

        return res.status(200).json({ message: "New restaurent added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteById = async(req,res)=>{
    const id = req.params.id;
    try {
        const deleteProd = await restaurents.findByIdAndDelete(id);
        if(!deleteProd){
            return res.status(404).json({error:'No Restaurent Found'});
        }
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default { add_restaurent: [ upload.single('image'),add_restaurent],deleteById}