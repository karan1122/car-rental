require('dotenv').config();

const express = require('express');
const router = express.Router();
router.use(express.json());
router.get('/',(req,res) => res.send("Product Details"));
const productModel = require("../modules/productdetails");
const mongoose = require("mongoose");
mongoose
.connect(process.env.MONGOURL)
.then(() => console.log("MongoDB Connected!!"));

//Insert
router.post("/insertproduct",(req,res) => {
    const { newproduct } = req.body;
    const insertproduct = productModel.create(newproduct);
    res.json({data:"Product inserted successfully!!"});
});

//fetch all the product of company
router.get("/fetch_prod/:company",async(req,res)=>{
    const cname1 = req.params.company;
    const companyModel = require('../modules/companydetails');
    const comname = await companyModel.findOne({cname:cname1});
    if(comname == null){
       return res.json({data:"Company not exists!!"});
    }
    else{
     const prods = await productModel.find({prodid:comname["prodid"]});
     if(prods == null)
     {
        return res.json({data:"Product not exists!!!"});
     }
     return res.json({ data:prods })
    }
});

//fetch all the product of a seller
router.get("/fetch_seller/:seller",async(req,res)=>{
    const sellnm = req.params.seller;
    const sellerModel = require('../modules/sellerdetails');
    const sname1 = await sellerModel.findOne({ sname:sellnm });
    if(sname1 == null){
       return res.json({data:"Seller not exists!!"});
    }
    else{
     const pname = await productModel.find({prodid:sname1["prodid"]});
     if(pname == null)
     {
        return res.json({data:"Product not exists!!"});
     }
     return res.json({data:pname})
    }
});

//Update
router.put("/updproduct/:prodcat",(req,res)=>{
    const prodcat = req.params.prodcat;
    const prodname = proddet.filter((updp) => (updp.category === prodcat));
    if(prodname.length > 0)
    {
        var updatecat = proddet.indexOf(prodname[1]);
        
        res.json({data:"Product Updated!!"});
    }
    else
    {
        res.json({data:"Product not updated!!"});
    }
});

//Delete
router.delete("/delproduct/:producttitile",async(req,res)=>{
    const prodtitile = req.params.producttitile;
    const delete_product = await productModel.findOneAndDelete({ title:prodtitile });
    return res.json({data:"Product deleted!"});
});
module.exports = router;