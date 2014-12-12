/**
 * Ocurrence
 *
 * @module      :: Model
 * @description :: Represent data model for the Ocurrence
 * @author        :: Isaac
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Location = new Schema({
  cidade:    {
    type    : String,
    require : true
  },
  bairro:    {
    type    : Array,
    require : true
  }
});

/*Tshirt.path('model').validate(function (v) {
  return ((v != "") && (v != null));
});*/

module.exports = mongoose.model('Occurrence', Occurrence);
