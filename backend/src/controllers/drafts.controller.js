const Draft = require('../models/Draft');
exports.list = async (req, res) => {
  const list = await Draft.find().limit(50);
  res.json(list);
};
