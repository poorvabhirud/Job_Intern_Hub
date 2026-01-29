const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });


    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || 'user' 
    });
    
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during signup' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  
  
  if (!token) return res.status(401).json({ msg: 'Access token required' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: 'Invalid token' });
    req.user = user;
    next();
  });
};

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
