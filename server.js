const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const productRoutes = require('./routes/Product');
const categoryRoutes = require('./routes/Category');
const contactUsRoutes = require('./routes/ContactUs');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Update to your frontend URL
}));
app.use(helmet());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API documentation for the product management system',
      contact: {
        name: 'Aryan Tyagi',
        email: 'aryantyagi296@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.BACKEND_URL || 'http://localhost:5000', // Update to your hosted API URL
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactUsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
