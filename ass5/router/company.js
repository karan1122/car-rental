require('dotenv').config();

const express = require('express');
const router = express.Router();
router.use(express.json());
const companyModel = require("../modules/companydetails");
const mongoose = require("mongoose");
mongoose
.connect(process.env.MONGOURL)
.then(() => console.log("MongoDB Connected!!"));

router.get('/',(req,res) => res.send("Company Details"));

//Insert
router.post("/insertcompany",(req,res) => {
    const { newcompany } = req.body;
    const insertcompany = companyModel.create(newcompany);
    res.json({data:"Company Inserted Successfully!!"});    
});

//fetch company details based on product name
router.get("/fetch_comp/:pname",async(req,res)=>{
  const prodname = req.params.pname;
  const productModel = require("../modules/productdetails");
  const productname = await productModel.findOne({title:prodname});
  
  if(productname == null){
       return res.json({data:"Product not exist!!"});
    }
    else{
     const cname = await companyModel.find({prodid:productname["prodid"]});
     if(cname == null){
        return res.json({data:"Company not exist!!"});
     }
     else{
        return res.json({data:cname})
     }
    }
});

//Update
router.put("/updcompany/:cname1",async(req,res)=>{
    const cname1 = req.params.cname1;
    const prodvalue = req.body.prodid;
    const updateproduct = await companyModel.findOneAndUpdate(
        {cname : cname1},
        {prodid : prodvalue},
        {new : true}
    );
    return res.json({data:"Company detail updated!!"});
});

//Delete
router.delete("/delcompany/:cname1",async(req,res)=>{
    const cname1 = req.params.cname1;
    const deletecompany = await companyModel.findOneAndDelete({cname:cname1});
    return res.json({data:"Company deleted!"});
});
module.exports = router;