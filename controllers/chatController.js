const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
