const mongoose = require("mongoose");

// connect to database
mongoose
  .connect("mongodb://localhost/benedict", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Error connecting to mongodb", err));

// Create schema (Class) for database
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

// Model (Object) of the database
const Product = mongoose.model("Product", productSchema);

async function create_product(productDetails) {
  const product = new Product({
    name: productDetails["name"],
    category: productDetails["category"],
    price: productDetails["price"],
  });

  const result = await product.save();
  console.log(result);
}
// create_course();

async function get_products() {
  const products = await Product.find();
  // console.log(products);
  return products;
}

async function search_products(text) {
  const search_term = text;
  const products = await Product.find({
    $or: [
      {
        category: {
          $regex: search_term,
          $options: "i",
        },
      },
      {
        name: {
          $regex: search_term,
          $options: "i",
        },
      },
    ],
  });
  console.log(products);
  return products;
}

module.exports.get_products = get_products;
module.exports.create_product = create_product;
module.exports.search_products = search_products;
