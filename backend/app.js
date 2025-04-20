// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');
const { authenticate } = require('../backend/middleware/auth')
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Load environment variables from .env file
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../Frontend/views'));
app.use('/assets', express.static(path.join(__dirname, '../Frontend/assets')));
app.use('/styles', express.static(path.join(__dirname, '../Frontend/styles')));

//Multer
const storage = multer.memoryStorage(); // Store file in memory (for DB)
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));



app.get('/', authenticate, async (req, res) => {
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

app.get('/productDetails/:id',authenticate, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const recommendedProducts = await Product.find({ category: "Home"}).limit(5);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('details', { product, recommendedProducts });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Server error');
  }
});

app.get('/productListingAll',authenticate, async (req, res) => {
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

app.get('/productListing/:category',authenticate, async (req, res) => {
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

app.get('/addProduct', (req, res) => {
  res.render('addProduct')
});

app.post('/addProduct', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description, material } = req.body;

    const newProduct = new Product({
      name,
      price: parseFloat(price),
      category,
      description,
      material,
      imageBuffer: {
        data: req.file.buffer, // raw image file buffer
        contentType: req.file.mimetype
      }
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      productId: savedProduct._id
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});



// Generate Token
function generateToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

app.get('/login', (req, res) => {
  res.render('login');  // Make sure login.ejs exists
});

// Render register page
app.get('/register', (req, res) => {
  res.render('register');  // Make sure register.ejs exists
});

// Register
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashed });
  await user.save();

  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/'); // or wherever
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = generateToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.get('/test-users', async (req, res) => {
  try {
    const users = await User.find(); // If this breaks, model is not working
    res.json(users);
  } catch (err) {
    console.error('Error testing user model:', err);
    res.status(500).send('Test failed');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
