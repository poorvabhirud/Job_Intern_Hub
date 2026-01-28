const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  skills: [{
    type: String,
    trim: true
  }],
  type: { 
    type: String, 
    enum: ['Internship', 'Job'], 
    required: [true, 'Type is required'] 
  },
  location: { 
    type: String, 
    required: [true, 'Location is required'] 
  },
  stipend: {
    type: String,
    default: 'Unpaid'
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
