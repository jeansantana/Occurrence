/**
 * Ocurrence
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author        :: Isaac Newton
 */

var Ocurrence = require('../models/ocurrence.js');

module.exports = function(app) {


  /**
   * Encontrar e recupera todos ocorrências
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllOcurrence = function(req, res) {
    console.log("GET - /ocurrences");
    return Ocurrence.find(function(err, ocurrences) {
      if(!err) {

        return res.send(ocurrences);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Encontre e recupera uma única ocorrência pelo seu ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findById = function(req, res) {

    console.log("GET - /ocurrence/:id");
    return Ocurrence.findById(req.params.id, function(err, ocurrence) {

      if(!ocurrence) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', ocurrence:ocurrence });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Cria uma nova ocorrencia
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addOcurrence = function(req, res) {

    console.log('POST - /ocurrence');

    var ocurrence = new Ocurrence({
      type_crime:    req.body.type_crime,
      date_crime:    req.body.date_crime,
      hour_crime :   req.body.hour_crime,
      title_crime:   req.body.title_crime,
      location_crime: req.body.location_crime,
      description_crime: req.body.description_crime
    });

    ocurrence.save(function(err) {

      if(err) {

        console.log('Error while saving ocurrence: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Ocurrence created");
        return res.send({ status: 'OK', ocurrence:ocurrence });

      }

    });

  };



  /**
   * Atualiza uma ocorrencia pelo ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateOcurrence = function(req, res) {

    console.log("PUT - /ocurrence/:id");
    return Ocurrence.findById(req.params.id, function(err, ocurrence) {

      if(!ocurrence) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }      
	  
      if (req.body.type_crime != null) ocurrence.type_crime = req.body.type_crime;
      if (req.body.date_crime != null) ocurrence.date_crime = req.body.date_crime;
      if (req.body.hour_crime  != null) ocurrence.hour_crime = req.body.hour_crime ;
      if (req.body.description_crime  != null) ocurrence.description_crime = req.body.description_crime;
      if (req.body.location_crime  != null) ocurrence.location_crime = req.body.location_crime ;
      if (req.body.size != null) ocurrence.size  = req.body.size;
      if (req.body.title_crime != null) ocurrence.title_crime = req.body.title_crime;

      return ocurrence.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', ocurrence:ocurrence });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(ocurrence);

      });
    });
  };



  /**
   * Deleta uma ocorrencia
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteOcurrence = function(req, res) {

    console.log("DELETE - /ocurrence/:id");
    return Ocurrence.findById(req.params.id, function(err, ocurrence) {
      if(!ocurrence) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return ocurrence.remove(function(err) {
        if(!err) {
          console.log('Removed ocurrence');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and actions
  app.get('/ocurrence', findAllOcurrence);
  app.get('/ocurrence/:id', findById);
  app.post('/ocurrence', addOcurrence);
  app.put('/ocurrence/:id', updateOcurrence);
  app.delete('/ocurrence/:id', deleteOcurrence);

}