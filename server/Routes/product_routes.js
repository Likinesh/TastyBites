import express from 'express';
import prodcontrol from '../controller/product.controller.js'
const router = express.Router();

router.post('/addproduct/:id',prodcontrol.addProduct);
router.get('/:id/allprod',prodcontrol.getProdByRestro)

router.get('/upload/:img_name',(req,res)=>{
    const img_name = req.params.img_name;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',img_name));
});

router.delete('/:id',prodcontrol.deleteById);

export default router;