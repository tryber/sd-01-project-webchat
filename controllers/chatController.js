const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '..', 'view', 'index.html'));
});

module.exports = router;
