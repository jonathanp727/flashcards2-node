const express = require('express');

const router = express.Router();

router.use('/user', require('./user'));
router.use('/deck', require('./deck'));
router.use('/card', require('./card'));

router.get('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
