const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

//@desc Get all products
//@route GET /
//@access public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

//@desc Create a new product
//@route POST /
//@access public
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, inStock, price } = req.body;
    const product = new Product({ name, inStock, price });
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

//@desc Get product
//@route GET /:id
//@access public
const getProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get a product" });
});

//@desc Update product
//@route PUT /:id
//@access public
const updateProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update a product" });
});

//@desc Delete product
//@route DELETE /:id
//@access public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).json(product);
});

//@desc Get all products in stock
//@route GET /in-stock
//@access public
const getProductsInStock = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ inStock: true });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
    throw error;
  }
});

//@desc Get all products in stock
//@route GET /price-range/:min/:max
//@access public
const getProductsByPriceRange = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({
      price: { $gte: req.params.min, $lte: req.params.max },
    });
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
    throw new Error("Failed to retrieve products by price range");
  }
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsInStock,
  getProductsByPriceRange,
};
