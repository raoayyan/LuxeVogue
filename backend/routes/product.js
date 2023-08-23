const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { Product } = require("../models/product");
const { isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/",isAdmin, async (req, res) => {
    
  const { name, brand, desc, price, image } = req.body;
  
  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineshop",
      });
      if (uploadRes) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          image: uploadRes,
        });
        const savedProduct = await product.save();

        res.status(200).send(savedProduct);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//GET PRODUCT BY ID

router.get('/find/:id', async(req,res)=>{
  try{
      const product = await Product.findById(req.params.id);
      res.status(200).send(product)
  }catch(err){
    res.status(500).send(err);
  }
})

//Delete product
router.delete('/:id', isAdmin, async (req,res)=>{
  try{
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).send("Product not found");
    
    if(product.image.public_id){
      const destroyResponse = await cloudinary.uploader.destroy(product.image.public_id);
       if(destroyResponse){
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(201).send("Deleted successfully")
       }
    }
    else{
      console.log("Action terminated Failed to delete product");
    }
  }catch(err){
    res.status(500).send(err)
  }
})

router.put("/:id",isAdmin, async(req,res)=>{
  if(req.body.productImg){
    try{
    const destroyResponse = await cloudinary.uploader.destroy(req.body.product.image.public_id)
    

    if(destroyResponse){
      const uploadResponse  =await cloudinary.uploader.upload(
        req.body.productImg,
        {
          upload_preset: "onlineshop",
        }
      )
      if(uploadResponse){
        const updateProduct = await Product.findByIdAndUpdate(req.params.id,{
          $set:{
            ...req.body.product,
            image:uploadResponse,
          },
        },
        {new:true}
        )
        res.status(200).send(updateProduct);
      }
    }
  } catch(err){
    res.status(500).send(err);
  }

}else{

    try{
       const updatedproduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set:req.body.product,
        },
        {new:true}
       );
       res.status(200).send(updatedproduct)
    }catch(err){
res.status(500).send(err);
    }
  }
  

})


module.exports = router;
