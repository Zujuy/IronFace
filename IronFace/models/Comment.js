  
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = Schema({
  content: String,

  authorId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },

  authorName:{
    type:String,
    ref:'User'
  },
  
  authorlastName:{
    type:String,
    ref:'User'
  },
  
  imagePath: String,

postID:{
  type:Schema.Types.ObjectId,
  ref:'Post'
}

  
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;