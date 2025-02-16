import express from "express";
import add_restro from '../controller/restaurents.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/add-restro',verifyToken,add_restro.add_restaurent);

router.get('/upload/:img_name',(req,res)=>{
    const img_name = req.params.img_name;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',img_name));
})
router.delete('/:id',add_restro.deleteById)
export default router;