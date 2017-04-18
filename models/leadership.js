var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create Schema
var leaderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image:{
    type: String,
    required:true
  },
  designation:{
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  abbr: {
    type: String,
    required :true
  },
  description: {
    type: String,
    required: true
  }},
  {
     timestamps: true
});

//the schema is useless unless a model is created
//creating model
var Leaders = mongoose.model('Leader', leaderSchema);

//make the model available to operations
module.exports = Leaders;
