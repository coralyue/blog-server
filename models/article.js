const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String
    },
    content: {
      type: String,
    },
    p: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  }
)

module.exports=mongoose.model("Article",articleSchema,"article")
