const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: [true, "Please add product name"],
  },
  inStock: {
    type: Boolean,
    required: [true, "Please add if product is in stock"],
  },
  price: {
    type: Number,
    required: [true, "Please add product price"],
  },
});

module.exports = mongoose.model("Product", productSchema);
