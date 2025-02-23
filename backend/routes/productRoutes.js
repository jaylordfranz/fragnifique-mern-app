const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// ✅ Ensure "uploads/" folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Created uploads directory:', uploadDir);
}

// ✅ Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// ✅ CREATE: Add a new product with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('🆕 Incoming POST request:', req.body);
    console.log('📸 Uploaded File:', req.file); // Debugging log

    const { name, price, description } = req.body;
    
    if (!name || !price || !description) {
      return res.status(400).json({ error: '❌ All fields are required' });
    }

    // ✅ Ensure correct image handling
    let imagePath = '';
    if (req.file) {
      imagePath = `http://192.168.8.36:5000/uploads/${req.file.filename}`;
      console.log('✅ Image path set to:', imagePath);
    } else {
      console.warn('⚠️ No image uploaded!');
    }

    const newProduct = new Product({ name, price, description, image: imagePath });
    await newProduct.save();

    console.log('✅ Product created:', newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('❌ Error adding product:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// ✅ READ: Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ✅ UPDATE: Edit product by ID (with optional image update)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    console.log(`🔄 Updating product ID: ${req.params.id}`);

    const { name, price, description } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: '❌ Product not found' });
    }

    let updateData = { name, price, description };

    if (req.file) {
      updateData.image = `http://192.168.8.36:5000/uploads/${req.file.filename}`;
      console.log('📸 New image uploaded:', updateData.image);
    } else {
      updateData.image = product.image; // Keep existing image if no new one is uploaded
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    console.log('✅ Product updated:', updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
});

// ✅ DELETE: Remove product by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log(`🗑️ Deleting product ID: ${req.params.id}`);

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: '❌ Product not found' });
    }

    // ✅ Delete the image file if it exists
    if (product.image) {
      const imagePath = path.join(__dirname, '../uploads/', path.basename(product.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log('🗑️ Image deleted:', imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    console.log('✅ Product deleted successfully');
    res.json({ message: '✅ Product deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// ✅ Serve uploaded images statically
router.use('/uploads', express.static(uploadDir));

module.exports = router;