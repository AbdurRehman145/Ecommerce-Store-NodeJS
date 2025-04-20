const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  soldCount: {
    type: Number,
    default: 0
  },
  reviewCount:  {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  material: String,
  mediumOrderPrice: {
    type: Number,
    default: 20
  },
  largeOrderPrice: {
    type: Number,
    default: 10
  },
  recommended: {
    type: Boolean,
    default: false
  },
  imageBuffer: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);


module.exports = Product;
