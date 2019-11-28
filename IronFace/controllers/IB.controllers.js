const User = require("../models/User");
const Post = require("../models/Post");


exports.postPost = async (req, res, next) => {
  const { _id } = req.user;
  
  let createPost;
  console.log('create post route controller')

  const {content} = req.body;
  
  if (req.file) {
    createPost =  {
      creatorId:_id,
      content,
      picPath: req.file.secure_url,
    }
  }else {

    createPost ={
      creatorId:_id,
      
      content
    } 
    }

  const postCreated = await Post.create(createPost);
  const userUpdated = await User.findByIdAndUpdate(
    _id,
    { $push: { post: postCreated._id } },
    { new: true }
  );

  req.user = userUpdated;
  res.redirect(`profile`);
};
