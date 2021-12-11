require("dotenv").config();
const express = require('express')
const app = express()
app.use(express.json());

const port = 3000

const lapmodel = require("./model/laptop");
const mongose = require("mongoose");
mongose.connect(process.env.mongoseurl).then(() => console.log("mongo DB connected!!"));


app.get('/', (req, res) => res.send('crud operation'))

app.get('/laptopdetail',async(req,res) =>{
    const details = await lapmodel.find();

    if(details == 0){
        return res.json({data:"No data found"});
    }

    return res.json({data:details});
});

app.post("/addlaptop",(req,res) =>{

    const addlaptop = req.body;
    

    //console.log(addlaptop);
    lapmodel.create(addlaptop)
  return res.json({data:"inserted successfully!!"});

    

    // return res.json({data:"something wrong"});
    
});

app.put("/updatelaptopname",async(req,res) =>{

    const l_id = req.body.lap_id;
    const lname = req.body.name;

    const updatedata = await lapmodel.findOneAndUpdate(
        {lap_id: l_id},
        {name: lname},

    );

    return res.json({data:"updated successfully!!"});
});

app.put("/updatelaptopPrice",async(req,res)=>{

    const l_id = req.body.lap_id;
    const rate = req.body.price;

    const updatedate = await lapmodel.findOneAndUpdate(
        {lap_id:l_id},
        {price:rate},
        {new:true}
    );

    return res.json("updated successfully!!");
});

app.delete("/dlaptoprecord",(req,res) =>{

    const dlap = req.body.lap_id;
    const deletelap = lapmodel.findOneAndDelete({lap_id:dlap},(err) =>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("one record deleted");
        }

    });
    return res.json({data : "delete data"+deletelap+"successfully!"});
    
});

// app.delete("/deleterecord/:lap_id",async (req,res) =>{
//    const did = req.params.lap_id;
//    const deletedata = await lapmodel.findOneAndDelete(
//     {lap_id:did}
//    );
//    return res.json({data:"data deleted successfully!!"})
// });

app.listen(port, () => console.log(`server on 3000`))