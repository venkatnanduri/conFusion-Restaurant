var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//create Schema
var promoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type:String,
    default:''
  },featured: {
    type: Boolean,
    default: false
  },
  price:{
    type: Currency,
    required: true
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
var Promotions = mongoose.model('Promotion', promoSchema);

//make the model available to operations
module.exports = Promotions;
