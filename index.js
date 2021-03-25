const express = require("express");
const underscore = require("underscore");
const mongoose = require("mongoose");

const db = require("./db");

const app = express();
// set html rendering engine
app.engine("html", require("ejs").renderFile);

// Routing with express
// app.get(<url>, <handler(req, res)> );
app.get("/", (req, res) => {
  res.render("index.html");
  const productDetails = req.query;
  if (!underscore.isEmpty(productDetails)) {
    db.create_product(productDetails);
    console.log("Product Saved");
  }
  console.log(productDetails);
});

// get products from mongodb
app.get("/api/products", (req, res) => {
  db.get_products()
    .then((products) => {
      res.send(products);
      console.log(products);
    })
    .catch((error) => {
      res.send("Error Fetching Products");
      return;
    });
});

// app.get("/api/product/:id", (req, res) => {
//   const objId = mongoose.Types.ObjectId(req.params.id);
//   console.log(objId);
//   res.send(db.get_product(objId));
//   // res.send(objId);
// });

// server started
app.listen(3000, () => console.log("Listening on port 3000..."));
