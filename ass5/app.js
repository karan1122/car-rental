require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const mongoose = require("mongoose");
mongoose
.connect(process.env.MONGOURL)
.then(() => console.log("MongoDB Connected!!"));

const prodRoute = require("./router/products");
const comRoute = require("./router/company");
const selRoute = require("./router/seller");

app.get('/', (req, res) => res.send('Hello World!'));

app.use("/products", prodRoute);
app.use("/company", comRoute);
app.use("/seller", selRoute);

app.listen(port, () => console.log(`Server running on port 3000!`));