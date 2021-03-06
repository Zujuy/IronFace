const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId:{
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

  authorPic:{
    type:String,
    ref:'User'
  },

  comments:[{
    type:Schema.Types.ObjectId,
    ref:'Comment'
  }],

  authorRole:{
    type:String,
    ref:'User'
  },

  picPath: String,
 
  notification: {
    type: Boolean,
    required: true,
    default: true
  },



});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;