require('dotenv').config();
const express = require('express');
const router = express.Router();
router.use(express.json());
router.get("/",(req,res) => res.send("Seller Details"));
const sellerModel = require("../modules/sellerdetails");
const mongoose = require("mongoose");
mongoose
.connect(process.env.MONGOURL)
.then(() => console.log("MongoDB Connected!!"));

//Insert
router.post("/insertsel",(req,res)=>{
    const { newseller } = req.body;
    const insertseller = sellerModel.create(newseller);
    res.json({data:"Seller Inserted Successfully!!"});
});

//fetch seller details based on product name
router.get("/fetch_data/:prodname",async(req,res)=>{
    const prodname = req.params.prodname;
    const productModel = require("../modules/productdetails");
    const prod1 = await productModel.findOne({ title: prodname });
    if(prod1 == null){
        return res.json({ data: "Product not exists!!" });
    }
    else{
     const sname1 = await sellerModel.find({prodid:productname["prodid"]});
     if(sname1 == null)
     {
        return res.json({data:"Company Not Found"});
     }
     return res.json({data:sname1})
    }
});

//Update 
router.put("/updseller/:snm",async(req,res)=>{
    const snm = req.params.snm;
    const productnm = req.body.prodid;
    const updateseller = await sellerModel.findOneAndUpdate(
        {sname:snm},
        {prodid:productnm},
        {new:true}
    );
    return res.json({ data: "Seller updated!!" });
});

//Delete 
router.delete("/delseller/:snm",async(req,res)=>{
    const snm = req.params.snm;
    const deleteseller = await sellerModel.findOneAndDelete({sname:snm});
    return res.json({data:"Seller deleted!"});
});
module.exports = router

