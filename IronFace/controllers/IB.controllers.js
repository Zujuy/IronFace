const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.feedsGet = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).populate({
    path: "favors",
    options: { sort: { createdAt: 1 } }
  });
  const post = await Post.find().populate({
    path: "favors",
    options: { sort: { createdAt: 1 } }
  })
  const comment = await Comment.find().populate({
    path: "favors",
    options: { sort: { createdAt: 1 } }
  })
  res.render("auth/feeds.hbs", { user, post, comment });
};

exports.postPost = async (req, res, next) => {
  const { _id, username, lastName} = req.user;
  let createPost;
  const {content} = req.body;

  if (req.file) {
    createPost =  {
      creatorId:_id,
      authorName:username,
      authorlastName:lastName,
      content,
      picPath: req.file.secure_url,
    }
  }else {
    createPost ={
      creatorId:_id,
      authorName:username,
      authorlastName:lastName,
      content
    } 
    }
// este es el controler de update pic
  const postCreated = await Post.create(createPost);
  const userUpdated = await User.findByIdAndUpdate(
    _id,
    { $push: { post: postCreated._id } },
    { new: true }
  );

  req.user = userUpdated;
  res.redirect(`profile`);
};

