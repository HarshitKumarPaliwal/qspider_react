require('dotenv').config();
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Course, Enquiry } = require('./models');

const app = express();
app.use(helmet({ contentSecurityPolicy: false })); // frontend uses inline script/style
app.use(express.json({ limit: '10kb' }));
const dist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(dist));

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

function admin(req, res, next) {
  const key = process.env.ADMIN_KEY || '';
  const got = req.get('x-admin-key') || '';
  const a = Buffer.from(key), b = Buffer.from(got);
  if (!key || a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

app.get('/api/courses', wrap(async (_req, res) => {
  res.json(await Course.find().sort('order').lean());
}));

app.post('/api/enquiries', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { error: 'Too many requests, try later' } }),
  wrap(async (req, res) => {
    const { name, phone, course } = req.body || {};
    const e = await Enquiry.create({ name, phone, course });
    res.status(201).json({ ok: true, id: e._id });
  }));

app.get('/api/enquiries', admin, wrap(async (_req, res) => {
  res.json(await Enquiry.find().sort('-createdAt').lean());
}));

app.patch('/api/enquiries/:id', admin, wrap(async (req, res) => {
  const e = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!e) return res.status(404).json({ error: 'Not found' });
  res.json(e);
}));

app.delete('/api/enquiries/:id', admin, wrap(async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

app.get(/^\/(?!api).*/, (_req, res) =>
  res.sendFile(path.join(dist, 'index.html'), e => e && res.status(404).send('Frontend not built. Run: npm run build')));

app.use((err, _req, res, _next) => {
  if (err.name === 'ValidationError') return res.status(400).json({ error: Object.values(err.errors)[0].message });
  if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid id' });
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`MongoDB connected. Running at http://localhost:${PORT}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
