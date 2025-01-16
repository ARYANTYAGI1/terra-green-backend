const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/ContactUsController');
const { validateContactForm } = require('../helpers/validations');

/**
 * @swagger
 * /api/contactus/submit:
 *   post:
 *     summary: Submit a new contact inquiry
 *     tags: [ContactUs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the person submitting the inquiry
 *               email:
 *                 type: string
 *                 description: The email address of the person submitting the inquiry
 *               subject:
 *                 type: string
 *                 description: The subject of the inquiry
 *               message:
 *                 type: string
 *                 description: The message content of the inquiry
 *     responses:
 *       200:
 *         description: Inquiry submitted successfully
 *       400:
 *         description: Validation errors
 */
router.post('/submit', validateContactForm, contactUsController.submitInquiry);

/**
 * @swagger
 * /api/contactus/list:
 *   get:
 *     summary: Get all submitted contact inquiries
 *     tags: [ContactUs]
 *     responses:
 *       200:
 *         description: A list of contact inquiries
 */
router.get('/list', contactUsController.listInquiries);

/**
 * @swagger
 * /api/contactus/detail/{id}:
 *   get:
 *     summary: Get the details of a specific contact inquiry
 *     tags: [ContactUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the inquiry to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inquiry details retrieved successfully
 *       404:
 *         description: Inquiry not found
 */
router.get('/detail/:id', contactUsController.inquiryDetails);

/**
 * @swagger
 * /api/contactus/delete/{id}:
 *   delete:
 *     summary: Delete a contact inquiry
 *     tags: [ContactUs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the inquiry to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inquiry deleted successfully
 *       404:
 *         description: Inquiry not found
 */
router.delete('/delete/:id', contactUsController.deleteInquiry);

module.exports = router;

