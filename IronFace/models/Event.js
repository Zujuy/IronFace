const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = Schema({
  content: String,
  creatorId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },

  picPath: String,
  picName: String,

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

timeStart:{
 type:String
},

timeEnd:{
  type:String
 },

  
    timestamps: true,
    versionKey: false
  
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;