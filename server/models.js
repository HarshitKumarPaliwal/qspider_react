const mongoose = require('mongoose');

const Course = mongoose.model('Course', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  icon: { type: String, default: '📘' },
  order: { type: Number, default: 0 }
}));

const Enquiry = mongoose.model('Enquiry', new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, minlength: [2, 'Name is too short'], maxlength: 80 },
  phone: { type: String, required: [true, 'Phone is required'], trim: true, match: [/^\+?[0-9\s-]{8,15}$/, 'Enter a valid phone number'] },
  course: { type: String, trim: true, maxlength: 100, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
}, { timestamps: true }));

module.exports = { Course, Enquiry };
