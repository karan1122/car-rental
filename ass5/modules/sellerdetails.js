const mongooose = require("mongoose");
const sellerSchema = mongooose.Schema({
    sellerid: String,
    sname: String,
    prodid:[{type: String}]
});
const sellerModel = mongooose.model("Db_seller",sellerSchema,"Db_seller");
module.exports = sellerModel;