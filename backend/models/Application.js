const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  resumeLink: { type: String, required: true },
  coverNote: { type: String, required: true },
  status: { type: String, enum: ['Applied', 'Shortlisted', 'Selected', 'Rejected'], default: 'Applied' }
}, { timestamps: true });

applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });
module.exports = mongoose.model('Application', applicationSchema);
