const mongoose = require('mongoose');

const noteCategorySchema = new mongoose.Schema({
  name: {
    type: String
  },
});

const Category=mongoose.model('Category',noteCategorySchema,"category");
module.exports = Category