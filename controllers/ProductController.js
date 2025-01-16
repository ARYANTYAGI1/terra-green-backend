const Product = require('../models/product'); // Product Model
const { validationResult } = require('express-validator'); // For validation
const { cloudinary } = require('../config/cloudinary'); // Cloudinary config

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'products', // Cloudinary folder
    });

    // Create new product
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      features: req.body.features.split(','), // Features as an array
      benefits: req.body.benefits.split(','), // Benefits as an array
      composition: req.body.composition,
      targetCrops: req.body.targetCrops.split(','), // Target crops as an array
      dosage: req.body.dosage,
      image: result.secure_url, // Cloudinary image URL
      applicationMethods: req.body.applicationMethods,
      precautions: req.body.precautions.split(','), // Precautions as an array
    });

    await newProduct.save();
    return res.status(201).json({ message: 'Product added successfully', newProduct });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Fetch product to update
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If image is being updated
    if (req.file) {
      // Delete old image from Cloudinary
      const publicId = product.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
      });
      product.image = result.secure_url;
    }

    // Update other fields
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.features = req.body.features ? req.body.features.split(',') : product.features;
    product.benefits = req.body.benefits ? req.body.benefits.split(',') : product.benefits;
    product.composition = req.body.composition || product.composition;
    product.targetCrops = req.body.targetCrops ? req.body.targetCrops.split(',') : product.targetCrops;
    product.dosage = req.body.dosage || product.dosage;
    product.applicationMethods = req.body.applicationMethods || product.applicationMethods;
    product.precautions = req.body.precautions ? req.body.precautions.split(',') : product.precautions;

    await product.save();
    return res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete image from Cloudinary
    const publicId = product.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`products/${publicId}`);

    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// List all products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Get product details
exports.productDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};
