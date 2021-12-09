const mongooose = require("mongoose");
const productSchema = mongooose.Schema({
    prodid: String,
    title: String,
    price: Number,
    category:[{type:String}],
    comid: String,
    selid: String
});
const productModel = mongooose.model("Db_product",productSchema,"Db_product");
module.exports = productModel;