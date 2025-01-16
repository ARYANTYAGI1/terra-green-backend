const { body } = require('express-validator');

exports.validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('composition').notEmpty().withMessage('Composition is required'),
  body('targetCrops').notEmpty().withMessage('Target crops are required'),
  body('dosage').notEmpty().withMessage('Dosage is required'),
  body('applicationMethods').notEmpty().withMessage('Application methods are required'),
  body('features').notEmpty().withMessage('Features are required'),
  body('benefits').notEmpty().withMessage('Benefits are required'),
  body('precautions').notEmpty().withMessage('Precautions are required'),
];

exports.validateCategory = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
];

exports.validateContactForm = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required'),
];
