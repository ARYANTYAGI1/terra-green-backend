const ContactForm = require('../models/ContactForm'); // Contact Form model
const { validationResult } = require('express-validator');

// Submit a contact us inquiry
exports.submitInquiry = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const newInquiry = new ContactForm({ name, email, message });
    await newInquiry.save();

    return res.status(201).json({ message: 'Inquiry submitted successfully', newInquiry });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// List all inquiries
exports.listInquiries = async (req, res) => {
  try {
    const inquiries = await ContactForm.find();
    return res.status(200).json(inquiries);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Get inquiry details
exports.inquiryDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await ContactForm.findById(id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    return res.status(200).json(inquiry);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete an inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await ContactForm.findById(id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    await ContactForm.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
};
