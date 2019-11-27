const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = Schema({
  content: String,
  creatorId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  commentId:[{
    type:Schema.Types.ObjectId,
    ref:'Comment'
  }],

  picPath: String,
  // picName: String,

  point: {
    type: {
      address: {
        type: String,
        require: true
      },
      coordinates: {
        type: [Number],
        require: true
      }
    },
    require: true
  },

  notification: {
    type: Boolean,
    required: true,
    default: true
  },

  

    
  
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;