
const mogoose = require("mongoose");

const laptopschema = mogoose.Schema({
    lap_id : String,
    name : String,
    category: String,
    price: Number,

});

const lapmodel = mogoose.model("laptopdetail",laptopschema,"laptopdetail");

module.exports = lapmodel;

