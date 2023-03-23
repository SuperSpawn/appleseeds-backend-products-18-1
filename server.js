const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsInStock,
  getProductsByPriceRange,
} = require("./controllers/productController");

connectDb();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.get("/", getProducts).post("/", createProduct);
app.get("/in-stock", getProductsInStock);
app.get("/price-range/:min/:max", getProductsByPriceRange);
app
  .get("/:id", getProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);
app.use(errorHandler);

app.listen(port, () => {
  console.log("App listening on port " + port);
});
