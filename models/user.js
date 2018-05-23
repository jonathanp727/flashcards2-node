const { ObjectID } = require('mongodb');
const mongoUtil = require('../helpers/mongoUtil.js');

const collectionName = 'users';

exports.all = (callback) => {
  mongoUtil.getDb().collection(collectionName).find().toArray((err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).findOne({ _id: ObjectID(id) }, (err, result) => {
    callback(err, result);
  });
};

exports.new = (data, callback) => {
  mongoUtil.getDb().collection(collectionName).insertOne({
    username: data.username,
    password: data.password,
  }, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, data, callback) => {
  mongoUtil.getDb().collection(collectionName).updateOne({ _id: ObjectID(id) }, {
    $set: {
      username: data.username,
      password: data.password,
    },
  }, (err) => {
    callback(err);
  });
};

exports.delete = (id, callback) => {
  mongoUtil.getDb().collection(collectionName).deleteOne({ _id: ObjectID(id) }, (err) => {
    callback(err);
  });
};
