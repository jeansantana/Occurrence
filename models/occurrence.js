/**
 * Ocurrence
 *
 * @module      :: Model
 * @description :: Represent data model for the Ocurrence
 * @author        :: Jean, Isaac, Emerson
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = {
  street:  String,
  city: String,
  neighborhood:  String,
  state:  String,
  latitude:  String,
  longitude:  String
};

var Occurrence = new Schema({

  title:    {
    type    : String,
    require : true
  },
  location:    {
    type    : Object,
    require : true
  },
  date:     {
    type    : Date,
    require : true
  },
  hour:   {
    type: String,
	  require : true
  },
  crimeType: {
    type: String,
    require : true
  },
  description: {
    type: String,
    require : true
  }
  
 /* modified: {
    type    : Date,
    default : Date.now
  }*/
});

/*Tshirt.path('model').validate(function (v) {
  return ((v != "") && (v != null));
});*/

module.exports = mongoose.model('Occurrence', Occurrence);
