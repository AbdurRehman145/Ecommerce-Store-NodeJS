const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
// Load environment variables
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  seedProducts();
})
.catch((err) => console.error('❌ Mongo error:', err));




const sampleProducts = [
  {
    name: 'Smart Watch',
    price: 49.99,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/smartwatch.jpg',
    description: 'Stay connected and on top of your goals with our sleek Smartwatch. Featuring a vibrant AMOLED display, fitness and sleep tracking, heart rate monitoring, and built-in GPS, it seamlessly syncs with your smartphone to keep notifications, music, and more at your wrist. With water resistance and long battery life, it’s the perfect companion for everyday wear and active lifestyles.',
    stock: 10,
    soldCount: 120,
    reviewCount: 34,
    rating: 4.1,
    material: 'Aluminium',
    mediumOrderPrice: 29.99,
    largeOrderPrice: 19.99,
    recommended: true
  },
  {
    name: 'Bluetooth Headphones',
    price: 39.50,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/headphone2.jpg',
    description: 'Experience rich, immersive sound with our premium Bluetooth Headphones. Engineered with active noise cancellation, ultra-comfortable ear cushions, and a long-lasting battery, these headphones are perfect for work, travel, and everything in between. Easy pairing, touch controls, and crystal-clear call quality make them a must-have for music lovers and multitaskers',
    stock: 15,
    soldCount: 80,
    reviewCount: 14,
    rating: 3.9,
    material: 'Plastic',
    mediumOrderPrice: 14.99,
    largeOrderPrice: 7.99,
    recommended: true
  },
  {
    name: 'Camera',
    price: 250.00,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/camera.jpg',
    description: 'Capture life’s best moments with the high-performance Camera. With a large sensor, fast autofocus, 4K video recording, and interchangeable lens compatibility, it delivers professional-quality photos and videos in any setting. Whether youre a beginner or a seasoned photographer, this camera offers intuitive controls and stunning results.',
    stock: 20,
    soldCount: 300,
    reviewCount: 8,
    rating: 4.4,
    material: 'Plastic',
    mediumOrderPrice: 169.99,
    largeOrderPrice: 159.99,
    recommended: true
  },
  {
    name: 'Phone',
    price: 180.00,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/phone2.jpg',
    description: 'Power meets performance in the latest Android Phone. Equipped with a stunning edge-to-edge display, lightning-fast processor, high-resolution multi-lens camera system, and 5G connectivity, it’s built for multitasking, gaming, and capturing every moment in detail. Customizable and secure, this device puts everything you need right in your hand.',
    stock: 8,
    soldCount: 1000,
    reviewCount: 276,
    rating: 4.8,
    material: 'Plastic',
    mediumOrderPrice: 149.99,
    largeOrderPrice: 139.99,
    recommended: true
  },
  {
    name: 'iPhone',
    price: 800.00,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/phone1.jpg',
    description: 'Experience the iconic iPhone, reimagined for speed, power, and precision. Featuring Apple’s latest chip, a cinematic-grade camera system, and a Super Retina XDR display, it delivers seamless performance and stunning visuals. With iOS, privacy-first design, and an ecosystem that just works, it’s not just a smartphone — it’s a lifestyle upgrade.',
    stock: 8,
    soldCount: 8000,
    reviewCount: 1237,
    rating: 4.9,
    material: 'Aluminium',
    mediumOrderPrice: 749.99,
    largeOrderPrice: 739.99,
    recommended: true
  },
  {
    name: 'Travel Backpack',
    price: 49.99,
    category: 'bag',
    image: 'http://localhost:3000/assets/bag.jpg',
    description: 'Durable and spacious backpack perfect for travel and daily use.',
    stock: 120,
    soldCount: 340,
    reviewCount: 58,
    rating: 4.5,
    material: 'Nylon',
    mediumOrderPrice: 45.99,
    largeOrderPrice: 42.99,
  },
  {
    name: 'Memory Foam Bed',
    price: 599.99,
    category: 'Home',
    image: 'http://localhost:3000/assets/bed.jpg',
    description: 'Queen size memory foam bed for ultimate comfort.',
    stock: 20,
    soldCount: 75,
    reviewCount: 22,
    rating: 4.7,
    material: 'Memory Foam',
    mediumOrderPrice: 579.99,
    largeOrderPrice: 559.99,
  },
  {
    name: 'Sofa Chair',
    price: 129.99,
    category: 'Home',
    image: 'http://localhost:3000/assets/chair.jpg',
    description: 'Comfortable Sofa Chair with lumbar support.',
    stock: 60,
    soldCount: 198,
    reviewCount: 45,
    rating: 4.3,
    material: 'Foam and Wood',
    mediumOrderPrice: 124.99,
    largeOrderPrice: 119.99,
  },
  {
    name: 'Espresso Coffee Machine',
    price: 249.99,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/coffeemachine.jpg',
    description: 'Automatic espresso machine with milk frother.',
    stock: 35,
    soldCount: 110,
    reviewCount: 40,
    rating: 4.6,
    material: 'Stainless Steel',
    mediumOrderPrice: 239.99,
    largeOrderPrice: 229.99,
    recommended: true
  },
  {
    name: 'Jacket',
    price: 89.99,
    category: 'Clothes',
    image: 'http://localhost:3000/assets/jacket.jpg',
    description: 'Insulated waterproof jacket for cold climates.',
    stock: 80,
    soldCount: 260,
    reviewCount: 65,
    rating: 4.4,
    material: 'Polyester',
    mediumOrderPrice: 84.99,
    largeOrderPrice: 79.99,
  },
  {
    name: 'Citrus Juicer',
    price: 39.99,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/juicer.jpg',
    description: 'Electric juicer for fresh citrus juice in seconds.',
    stock: 90,
    soldCount: 130,
    reviewCount: 29,
    rating: 4.2,
    material: 'Plastic',
    mediumOrderPrice: 36.99,
    largeOrderPrice: 34.99,
  },
  {
    name: 'Electric Kettle',
    price: 29.99,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/kettle.jpg',
    description: 'Fast-boiling electric kettle with auto shut-off.',
    stock: 150,
    soldCount: 400,
    reviewCount: 88,
    rating: 4.5,
    material: 'Stainless Steel',
    mediumOrderPrice: 27.99,
    largeOrderPrice: 25.99,
  },
  {
    name: 'LED Desk Lamp',
    price: 24.99,
    category: 'Home',
    image: 'http://localhost:3000/assets/lamp.jpg',
    description: 'Adjustable LED desk lamp with touch controls.',
    stock: 100,
    soldCount: 290,
    reviewCount: 47,
    rating: 4.4,
    material: 'Aluminum',
    mediumOrderPrice: 22.99,
    largeOrderPrice: 20.99,
  },
  {
    name: 'Laptop',
    price: 799.99,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/laptop.jpg',
    description: 'Lightweight laptop with 16GB RAM and 512GB SSD.',
    stock: 30,
    soldCount: 95,
    reviewCount: 39,
    rating: 4.6,
    material: 'Aluminum',
    mediumOrderPrice: 769.99,
    largeOrderPrice: 749.99,
  },
  {
    name: 'Denim Jeans',
    price: 39.99,
    category: 'Clothes',
    image: 'http://localhost:3000/assets/pant.jpg',
    description: 'Classic slim-fit denim jeans for everyday wear.',
    stock: 140,
    soldCount: 320,
    reviewCount: 53,
    rating: 4.3,
    material: 'Cotton',
    mediumOrderPrice: 36.99,
    largeOrderPrice: 34.99,
  },
  {
    name: 'Indoor Potted Plant',
    price: 19.99,
    category: 'Home',
    image: 'http://localhost:3000/assets/plant.jpg',
    description: 'Low maintenance indoor plant perfect for decor.',
    stock: 60,
    soldCount: 200,
    reviewCount: 33,
    rating: 4.7,
    material: 'Live Plant',
    mediumOrderPrice: 17.99,
    largeOrderPrice: 15.99,
  },
  {
    name: 'Ceramic Pot',
    price: 54.99,
    category: 'Home',
    image: 'http://localhost:3000/assets/pot.jpg',
    description: 'Non-stick ceramic pot ideal for stews and soups.',
    stock: 40,
    soldCount: 105,
    reviewCount: 26,
    rating: 4.4,
    material: 'Ceramic',
    mediumOrderPrice: 51.99,
    largeOrderPrice: 48.99,
  },
  {
    name: 'Cotton Casual Shirt',
    price: 29.99,
    category: 'Clothes',
    image: 'http://localhost:3000/assets/shirt1.jpg',
    description: 'Breathable cotton shirt suitable for all seasons.',
    stock: 100,
    soldCount: 280,
    reviewCount: 50,
    rating: 4.3,
    material: 'Cotton',
    mediumOrderPrice: 27.99,
    largeOrderPrice: 25.99,
  },
  {
    name: 'Cotton Casual Shirt',
    price: 29.99,
    category: 'Clothes',
    image: 'http://localhost:3000/assets/shirt2.jpg',
    description: 'Breathable cotton shirt suitable for all seasons.',
    stock: 100,
    soldCount: 280,
    reviewCount: 50,
    rating: 4.3,
    material: 'Cotton',
    mediumOrderPrice: 27.99,
    largeOrderPrice: 25.99,
  },
  {
    name: 'Android Tablet',
    price: 229.99,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/tablet.jpg',
    description: 'Sleek 10-inch tablet with high-res display and long battery life.',
    stock: 50,
    soldCount: 135,
    reviewCount: 41,
    rating: 4.5,
    material: 'Plastic and Glass',
    mediumOrderPrice: 219.99,
    largeOrderPrice: 209.99,
  },
  {
    name: 'Leather Wallet',
    price: 24.99,
    category: 'Clothes',
    image: 'http://localhost:3000/assets/wallet.jpg',
    description: 'Slim leather wallet with RFID protection.',
    stock: 90,
    soldCount: 310,
    reviewCount: 46,
    rating: 4.6,
    material: 'Leather',
    mediumOrderPrice: 22.99,
    largeOrderPrice: 20.99,
    
  },
  {
    name: 'Front Load Washing Machine',
    price: 699.99,
    category: 'Electronics',
    image: 'http://localhost:3000/assets/washingmachine.jpg',
    description: 'Energy efficient front-load washer with smart features.',
    stock: 25,
    soldCount: 88,
    reviewCount: 27,
    rating: 4.7,
    material: 'Stainless Steel',
    mediumOrderPrice: 679.99,
    largeOrderPrice: 659.99,
  },
  {
    name: 'Foldable Picnic Chair',
    price: 34.99,
    category: 'Home',
    image: 'http://localhost:3000/assets/thing.jpg',
    description: 'Lightweight and durable chair perfect for outdoor use.',
    stock: 110,
    soldCount: 240,
    reviewCount: 38,
    rating: 4.4,
    material: 'Aluminum and Fabric',
    mediumOrderPrice: 31.99,
    largeOrderPrice: 29.99,
  }
];
const sampleUsers = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'hashedpassword123',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'securepass456',
  },
  {
    username: 'bob_builder',
    email: 'bob@example.com',
    password: 'bobTheBuilder789',
  },
  {
    username: 'alice_wonder',
    email: 'alice@example.com',
    password: 'wonderPass101',
  },
  {
    username: 'charlie_brown',
    email: 'charlie@example.com',
    password: 'charlie321',
  }
];

async function seedUsers() {
  try {
    for (const user of sampleUsers) {
      const { email, ...updateData } = user;
      await User.updateOne(
        { email },           // Use 'email' as the unique identifier
        { $set: updateData }, // Update the document
        { upsert: true }      // Insert if not found
      );
      console.log(`✅ User "${user.username}" upserted or updated`);
    }
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}


async function seedProducts() {
  try {
    for (const product of sampleProducts) {
      const { name, ...updateData } = product;
      await Product.updateOne(
        { name },             // Find product by 'name' (or any unique field)
        { $set: updateData }, // Update the document with new data
        { upsert: true }      // Insert if the product doesn't exist
      );
      console.log(`✅ Product "${name}" upserted or updated`);
    }
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}


