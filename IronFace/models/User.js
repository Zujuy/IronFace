const { model, Schema } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },


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
    enum: ["Student","Teacher Assistant","Lead Teacher","Staff", "Iron Buddy"],
    default:"Student"
  },

  photoURL: {
    type: String,
    // default:
      // "https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png"
  },

  post:[
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],

});



userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);