const express = require('express');
const cardModel = require('../models/card.js');

const router = express.Router();

// new
router.post('/', (req, res, next) => {
  cardModel.new(req.body, (err, result) => {
    if (err) return next(err);
    res.json(result.insertedId);
  });
});

// update card statistics from latest session
router.put('/do/:id', (req, res, next) => {
  cardModel.doCard(req.params.id, req.body, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// update user-specified data
router.put('/:id', (req, res, next) => {
  cardModel.updateCard(req.params.id, req.body, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// delete
router.delete('/:deckid/:id', (req, res, next) => {
  cardModel.delete(req.params.deckid, req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
