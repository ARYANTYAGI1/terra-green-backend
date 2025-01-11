const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String, // Example: "Insecticides"
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: [
    {
      type: String, // List of features
    },
  ],
  benefits: [
    {
      type: String, // List of benefits
    },
  ],
  composition: {
    type: String, // Example: "Active Ingredient 3% GR"
    required: true,
  },
  targetCrops: [
    {
      type: String, // Example: "Wheat, Rice, Cotton"
    },
  ],
  dosage: {
    type: String, // Example: "Apply 25-30 kg per hectare"
  },
  image: {
    type: String, // URL of the product image
    required: true,
  },
  applicationMethods: {
    type: String, // Instructions for use
  },
  precautions: [
    {
      type: String, // List of precautions to follow
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
