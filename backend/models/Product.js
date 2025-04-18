const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: String,
  image: String,
  description: String,
  stock: {
    type: Number,
    default: 0
  },
  soldCount: Number,
  reviewCount: Number,
  rating: Number,
  material: String,
  mediumOrderPrice: Number,
  largeOrderPrice: Number,
  recommended: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
