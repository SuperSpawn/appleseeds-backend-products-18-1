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
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

//@desc Update product
//@route PUT /:id
//@access public
const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, inStock, price } = req.body;
  if (name != null) {
    product.name = name;
  }
  if (inStock != null) {
    product.inStock = inStock;
  }
  if (price != null) {
    product.price = price;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    product
  );

  res.status(200).json(updatedProduct);
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

//@desc Delete all products
//@route DELETE /
//@access public
const deleteAllProducts = asyncHandler(async (req, res) => {
  await Product.deleteMany({});
  res.status(200).json({ success: true });
});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsInStock,
  getProductsByPriceRange,
  deleteAllProducts,
};
