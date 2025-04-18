// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Product = require('./models/Product');
const path = require('path');
// Load environment variables from .env file
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend/views'));
app.use('/assets', express.static(path.join(__dirname, '../Frontend/assets')));
app.use('/styles', express.static(path.join(__dirname, '../Frontend/styles')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));



app.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    const recommendedProducts = await Product.find({ recommended: true }).limit(5);
    const dealProducts = await Product.find({ recommended: true });
    res.render('home', { products, recommendedProducts, dealProducts}); // Pass products to the EJS template
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Server error');
  }
});

app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    console.log("Search query:", query);

    if (!query) {
      return res.redirect('/');
    }

    const regex = new RegExp(query, 'i'); // case-insensitive regex

    const products = await Product.find({
      $or: [
        { name: regex },
        { category: regex }
      ]
    });

    res.render('listing', { products });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).send('Server error');
  }
});

app.get('/productDetails/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('details', { product });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Server error');
  }
});

app.get('/productListingAll', async (req, res) => {
  try {
    const category = req.params.category;
    console.log("Category requested:", req.params.category);
    
    const products = await Product.find(); 
    res.render('listing', { products }); 

  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Server error');
  }
});

app.get('/productListing/:category', async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({
      category: new RegExp(`^${category}$`, 'i')
    });
    res.render('listing', { products }); 
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
