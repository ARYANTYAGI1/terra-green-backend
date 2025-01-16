const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { validateProduct } = require('../helpers/validations');
const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

/**
 * @swagger
 * /api/products/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: A description of the product
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the product
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Validation errors or missing image
 */
router.post('/add', upload.single('image'), validateProduct, productController.addProduct);

/**
 * @swagger
 * /api/products/update/{id}:
 *   put:
 *     summary: Update an existing product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               description:
 *                 type: string
 *                 description: A description of the product
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the product (optional for update)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation errors
 *       404:
 *         description: Product not found
 */
router.put('/update/:id', upload.single('image'), validateProduct, productController.updateProduct);

/**
 * @swagger
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/delete/:id', productController.deleteProduct);

/**
 * @swagger
 * /api/products/list:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/list', productController.listProducts);

/**
 * @swagger
 * /api/products/detail/{id}:
 *   get:
 *     summary: Get the details of a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *       404:
 *         description: Product not found
 */
router.get('/detail/:id', productController.productDetails);

module.exports = router;
