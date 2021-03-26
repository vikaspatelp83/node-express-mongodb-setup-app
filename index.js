const express = require("express");
const underscore = require("underscore");
const mongoose = require("mongoose");

const db = require("./db");

const app = express();

/* for creating named routes
Read More: https://github.com/dizlexik/express-reverse
*/
require("express-reverse")(app);

// set html rendering engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// Routing with express
app.get("home_page", "/", (req, res) => {
  res.render("pages/index");
  const productDetails = req.query;
  if (!underscore.isEmpty(productDetails)) {
    db.create_product(productDetails);
    console.log("Product Saved");
  }
  console.log(productDetails);
});

// get products from mongodb
app.get("products_page", "/api/products/", (req, res) => {
  db.get_products()
    .then((products) => {
      res.render("pages/products", { products: products });
      // console.log(products);
    })
    .catch((error) => {
      res.send("Error Fetching Products");
      console.log(error);
      return;
    });
});

app.get("search", "/api/products/search", (req, res) => {
  const { q } = req.query;
  if (!underscore.isEmpty(q)) {
    db.search_products(q)
      .then((products) => {
        res.render("pages/search", {
          products: products,
          q: q,
        });
      })
      .catch((error) => {
        res.send("No Products Found");
        console.log(error);
        return;
      });
    console.log(q);
  }
});

// app.get("/api/product/:id", (req, res) => {
//   const objId = mongoose.Types.ObjectId(req.params.id);
//   console.log(objId);
//   res.send(db.get_product(objId));
//   // res.send(objId);
// });

// server started
app.listen(3000, () => console.log("Listening on port 3000..."));
