/**
 * Ocurrence
 *
 * @module      :: Model
 * @description :: Represent data model for the Ocurrence
 * @author        :: Isaac
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Occurrence = new Schema({

  title:    {
    type    : String,
    require : true
  },
  location:    {
    type    : String,
    require : true
  },
  date:     {
    type    : String,
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
  /*modified: {
    type    : Date,
    default : Date.now
  }*/
});

/*Tshirt.path('model').validate(function (v) {
  return ((v != "") && (v != null));
});*/

module.exports = mongoose.model('Occurrence', Occurrence);