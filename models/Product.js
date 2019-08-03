var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  color: String,
  price: Number,
  });

module.exports = mongoose.model('Product', ProductSchema);