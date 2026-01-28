const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Job = require('../models/Job');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 9, search, type, location, skills } = req.query;
    let query = { isActive: true };
    
    if (search) query.title = { $regex: search, $options: 'i' };
    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (skills) query.skills = { $regex: skills, $options: 'i' };

    const jobs = await Job.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.post('/', auth, admin, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', auth, admin, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
