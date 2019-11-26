  
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: String,

  authorId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  
  imagePath: String,

  iamgeName: String,

  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
  
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;