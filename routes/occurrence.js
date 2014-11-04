/**
 * Occurrence
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author        :: Isaac Newton
 */

var Occurrence = require('../models/occurrence.js');

module.exports = function(app) {


    /**
   * Encontrar e recupera todos ocorrências
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
    findAllOccurrence = function(req, res) {
        console.log("GET - /occurrences");
        return Occurrence.find(function(err, occurrences) {
            if(!err) {
                return res.send(occurrences);
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    };



    /**
   * Encontra e recupera uma única ocorrência pelo seu ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
    findById = function(req, res) {

        console.log("GET - /occurrence/:id");
        return Occurrence.findById(req.params.id, function(err, occurrence) {

            if(!occurrence) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }

            if(!err) {
                var occur = new Occurrence({
                    title       : occurrence.title,
                    location    : occurrence.location,
                    date        : occurrence.date,
                    hour        : occurrence.hour,
                    crimeType   : occurrence.crimeType,
                    description : occurrence.description
                });
                return res.send( occur );
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
    addOccurrence = function(req, res) {

        console.log('POST - /occurrence');

        var occurrence = new Occurrence({
            title       : req.body.title,
            location    : req.body.location,
            date        : req.body.date,
            hour        : req.body.hour,
            crimeType   : req.body.crimeType,
            description : req.body.description
        });

        occurrence.save(function(err) {

            if(err) {

                console.log('Error while saving occurrence: ' + err);
                res.send({ error:err });
                return;

            } else {

                console.log('Occurrence created');
                return res.send({ status: 'OK', occurrence:occurrence });

            }

        });

    };

    /**
   * Atualiza uma ocorrencia pelo ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
    updateOccurrence = function(req, res) {

        console.log("PUT - /occurrence/:id");
        return Occurrence.findById(req.params.id, function(err, occurrence) {

            if(!occurrence) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }

            if (req.body.tile != null) 
                occurrence.title = req.body.title; 
            if (req.body.location != null) 
                occurrence.location = req.body.location; 
            if (req.body.date != null)
                occurrence.date = req.body.date; 
            if (req.body.hour != null)
                occurrence.hour = req.body.hour; 
            if (req.body.crimeType != null) 
                occurrence.crimeType = req.body.crimeType; 
            if (req.body.description != null) 
                occurrence.description = req.body.description; 
            if (req.body.size != null) 
                occurrence.size = req.body.size;

            return occurrence.save(function(err) {
                if(!err) {
                    console.log('Updated');
                    return res.send({ status: 'OK', occurrence:occurrence });
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

                res.send(occurrence);

            });
        });
    };



    /**
   * Deleta uma ocorrencia
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
    deleteOccurrence = function(req, res) {

        console.log("DELETE - /occurrence/:id");
        return Occurrence.findById(req.params.id, function(err, occurrence) {
            if(!occurrence) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }

            return occurrence.remove(function(err) {
                if(!err) {
                    console.log('Removed occurrence');
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    console.log('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            })
        });
    }

    //Link routes and actions
    app.get('/occurrence', findAllOccurrence);
    app.get('/occurrence/:id', findById);
    app.post('/occurrence', addOccurrence);
    app.put('/occurrence/:id', updateOccurrence);
    app.delete('/occurrence/:id', deleteOccurrence);

}