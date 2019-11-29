const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = Schema({
  eventName:String,

  content: String,

  date:String,

  creatorId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },

  creatorName:{
    type:String,
    ref:'User'
  },

  creatorlastName:{
    type:String,
    ref:'User'
  },


  eventplace: {
    address: {
      type: String
    },
    coordinates: {
      lat: [Number],
      lng: [Number],
    }
  },

timeStart:{
 type:String
},

place:String,

});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;