const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');
const { validateCategory } = require('../helpers/validations');

/**
 * @swagger
 * /api/categories/add:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category (required)
 *               description:
 *                 type: string
 *                 description: A description of the category (optional)
 *             required:
 *               - name  # name is required, description is optional
 *     responses:
 *       200:
 *         description: Category added successfully
 *       400:
 *         description: Validation errors (e.g. missing 'name' or invalid data)
 *       500:
 *         description: Server error
 */
router.post('/add', validateCategory, categoryController.addCategory);

/**
 * @swagger
 * /api/categories/update/{id}:
 *   put:
 *     summary: Update an existing category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               description:
 *                 type: string
 *                 description: A description of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation errors
 *       404:
 *         description: Category not found
 */
router.put('/update/:id', validateCategory, categoryController.updateCategory);

/**
 * @swagger
 * /api/categories/delete/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/delete/:id', categoryController.deleteCategory);

/**
 * @swagger
 * /api/categories/list:
 *   get:
 *     summary: Get a list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get('/list', categoryController.listCategories);

/**
 * @swagger
 * /api/categories/detail/{id}:
 *   get:
 *     summary: Get the details of a specific category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details retrieved successfully
 *       404:
 *         description: Category not found
 */
router.get('/detail/:id', categoryController.categoryDetails);

module.exports = router;
