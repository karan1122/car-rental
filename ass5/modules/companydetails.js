const mongooose = require("mongoose");
const companySchema = mongooose.Schema({
    comid: String,
    cname: String,
    prodid:[{type: String}]
});
const companyModel = mongooose.model("Db_company",companySchema,"Db_company");
module.exports = companyModel;