const { ObjectId } = require('mongodb');
const mongoUtil = require('../helpers/mongoUtil');

const collectionName = 'decks';

exports.new = (data, callback) => {
  mongoUtil.getDb().collection(collectionName).update({
    _id: ObjectId(data.deckId),
  }, {
    $push: {
      cards: {
        _id: ObjectId(),
        front: data.front,
        back: data.back,
        isStarred: data.isStarred,
        dateFirstSeen: null,
        misses: [],
        history: 0,
        category: data.category,
        level: data.level,
      },
    },
  }, (err, result) => {
    callback(err, result);
  });
};

// update card statistics from latest session
exports.doCard = (cardId, data, callback) => {
  const updateString = {
    $set: {
      'cards.$.history': data.history,
    },
  };
  if (data.missed) {
    updateString.$push = { 'cards.$.misses': new Date() };
  }
  if (data.isFirstSighting) {
    updateString.$set['cards.$.dateFirstSeen'] = new Date();
  }

  mongoUtil.getDb().collection(collectionName).updateOne({
    _id: ObjectId(data.deckId),
    'cards._id': ObjectId(cardId),
  }, updateString, (err) => {
    callback(err);
  });
};

// Update card's user-specified data
exports.updateCard = (cardId, data, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({
    _id: ObjectId(data.deckId),
    'cards._id': ObjectId(cardId),
  }, {
    $set: {
      'cards.$.front': data.front,
      'cards.$.back': data.back,
      'cards.$.isStarred': data.isStarred,
      'cards.$.category': data.category,
      'cards.$.level': data.level,
    },
  }, (err) => {
    callback(err);
  });
};

exports.delete = (deckId, cardId, callback) => {
  mongoUtil.getDb().collection(collectionName).update({
    _id: ObjectId(deckId),
  }, {
    $pull: {
      cards: {
        _id: ObjectId(cardId),
      },
    },
  }, (err) => {
    callback(err);
  });
};
