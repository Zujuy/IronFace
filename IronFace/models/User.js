  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },

  password: String,

  username:{
    type: String,
    required: true,
    default:"Ironhacker",
  },

  lastName:{
    type: String,
    required: true,
    default:"undifine",
  },

  genre:{
    type: String,
    required: true,
    enum: ["Male", "Famale","undifine"],
    default:"undifine"
  },

  birthdate: String,

  wFrom:String,

  bootCamp: {
    type: String,
    required: true,
    enum: ["Data Analytics", "Web Development", "UX/UI Design"],
  },

  courseMode:{
    type: String,
    required: true,
    enum: ["Full time", "Part time"],
    default:"Full time"
  },

  role: {
    type: String,
    enum: ["Alumn","Teacher Assistant","Lead Teacher","Staff", "Iron Buddy"],
    default:"Alumn"
  },

  image: {
    type: String,
    //default:
  },

  post:[
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
});



const User = mongoose.model("User", UserSchema);

module.exports = User;

