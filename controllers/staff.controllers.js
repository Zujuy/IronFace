const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Event = require("../models/Event");

exports.commentsGet = async (req, res) => {

  const { id } = req.params;


  const post = await Post.findById(id).populate({
    path: "users",
    options: { sort: { createdAt: 1 } }
  })
  .populate({
    path: "comments",
    options: { sort: { createdAt: 1 } }
  })


  res.render("auth/detallepost", {user: req.user, post }) // cambiar la ruta con 
}

exports.feedsGet = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).populate({
    path: "users",
    options: { sort: { createdAt: 1 } }
  });
  const post = await Post.find().populate({
    path: "post",
    options: { sort: { createdAt: 1 } }
  })
  res.render("auth/feeds", {user, post});
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
  const { _id, username, lastName } = req.user;  
  let createComment;
  const {content} = req.body;
  const idPost = req.body.idPost

  if (req.file) {
    createComment =  {
      creatorId:_id,
      authorName:username,
      authorlastName:lastName,
      postId:idPost,
      content,
      picPath: req.file.secure_url,
    }
  }else {
    createComment ={
      content,
      creatorId:_id,
      authorName:username,
      authorlastName:lastName,
      postId:idPost 
    } 
    }

  const commentCreated = await Comment.create(createComment);
  const userUpdated = await User.findByIdAndUpdate(
    _id,
    { $push: { comments: commentCreated._id } },
    { new: true }
  );

  const postUpdated = await Post.findOneAndUpdate(
    idPost ,
    { $push: { comments: commentCreated._id } },
    { new: true }
  );

  req.user = userUpdated;
  req.post= postUpdated;
  res.redirect(`feeds`);
};


exports.editUserGet = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).populate({
    path: "favors",
    options: { sort: { createdAt: 1 } }
  });
  res.render("auth/edit", { user });
};


exports.editUserPost = async (req, res) => {
  let userUpdated;
  const { _id} = req.user;
  const {username,lastName,password,genre,birthdate,wFrom,bootCamp,courseMode} = req.body;
  if (req.file) {
    userUpdated = await User.findByIdAndUpdate(_id, {
      $set: {
        username,
        lastName,
        genre,
        password,
        birthdate,
        bootCamp,
        courseMode,
      }
    });
  } else {
    userUpdated = await User.findByIdAndUpdate(_id, {
      $set: {
        username,
        lastName,
        genre,
        password,
        birthdate,
        bootCamp,
        courseMode
      }
    });
  }
  req.user = userUpdated;
  res.redirect(`profile`);
};




exports.deletePostPost = async (req, res) => {
  const { _idPost} = req.body;
  userUpdated = await Post.findByIdAndDelete(_idPost);
  res.redirect(`feeds`);
}



exports.alleventGet = async (_, res) => {
  const {user} = req;
  const events = await Event.find().populate({
    path: "events",
    options: { sort: { createdAt: 1 } }
  });
  res.render("auth/events", {user ,events});
};




exports.eventGet = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).populate({
    path: "favors",
    options: { sort: { createdAt: 1 } }
  });
  res.render("auth/crearevento", { user });
};




exports.eventPost = async (req, res, next) => {
  const { _id, username, lastName } = req.user;
  const {
    lng,
    lat,
    eventName,
    content,
    date,
    timeStart,
    place,
     address,
  } = req.body;

  const event = {
     creatorId: _id,
     creatorName:username,
     creatorlastName:lastName,
      point: {
      address: address,
      coordinates: [lng, lat]
    },
      eventName,
      content,
      date,
      timeStart,
      place
  };

  const eventCreated = await Event.create(event);
  const userUpdated = await User.findByIdAndUpdate(
    _id,
    { $push: { events: eventCreated._id } },
    { new: true }
  );

  req.user = userUpdated;
  res.redirect("profile");
};



exports.allusersGet= async (req, res) => {
  const { user} = req;
  const users = await User.find().populate({
    path: "favors",
    options: { sort: { createdAt: 1 } }
  });
  res.render("auth/allUsers", { user, users} );
};






exports.deleteUserPost = async (req, res) => {
  const { _id} = req.user;
  userUpdated = await User.findByIdAndDelete(_id);
  res.redirect(`/`);
}
 