const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");


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






exports.postPost = async (req, res, next) => {
  const { _id } = req.user;
  
  let createPost;


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







exports.commentPost = async (req, res, next) => {
  const { _id } = req.user;
  console.log(req)

  // const idPost  = req.post._id
  
  let createComment;


  const {content} = req.body;
  
  if (req.file) {
    createComment =  {
      creatorId:_id,
      // postId:idPost,
      content,
      picPath: req.file.secure_url,
    }
  }else {
    
    createComment ={
      content,
      creatorId:_id,
      // postId:idPost 
      
    } 
    }

  const commentCreated = await Post.create(createComment);
  const userUpdated = await User.findByIdAndUpdate(
    _id,
    { $push: { comments: commentCreated._id } },
    { new: true }
  );

  const postUpdated = await Post.findByIdAndUpdate(
    _id,
    { $push: { comments: commentCreated._id } },
    { new: true }
  );


  req.user = userUpdated;
  req.post= postUpdated;
  res.redirect(`feeds`);
};


