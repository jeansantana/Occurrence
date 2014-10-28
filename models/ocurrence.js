/**
 * Ocurrence
 *
 * @module      :: Model
 * @description :: Represent data model for the Ocurrence
 * @author        :: Isaac
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Ocurrence = new Schema({

  type_crime:    {
    type    : String,
    require : true
  },
  date_crime:    {
    type    : String,
    require : true
  },
  hour_crime:     {
    type    : String,
    require : true
  },
  title_crime:   {
    type: String,
	require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  }
});

/*Tshirt.path('model').validate(function (v) {
  return ((v != "") && (v != null));
});*/

module.exports = mongoose.model('Ocurrence', Ocurrence);