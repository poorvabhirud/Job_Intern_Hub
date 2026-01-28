const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Application = require('../models/Application');
const Job = require('../models/Job');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { jobId, resumeLink, coverNote } = req.body;
    const existing = await Application.findOne({ userId: req.user._id, jobId });
    if (existing) return res.status(400).json({ msg: 'Already applied' });

    const app = new Application({ userId: req.user._id, jobId, resumeLink, coverNote });
    await app.save();
    res.json(app);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user._id }).populate('jobId', 'title type');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, admin, async (req, res) => {
  try {
    const { status, jobId } = req.query;
    let query = {};
    if (status) query.status = status;
    if (jobId) query.jobId = jobId;
    const apps = await Application.find(query).populate('userId', 'name email').populate('jobId', 'title');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!app) return res.status(404).json({ msg: 'Not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
