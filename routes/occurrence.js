/**
 * Occurrence
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author        :: Jean, Isaac, Emerson
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
                var occs = [];
                
				for(var i = 0; i < occurrences.length; ++i) {
                    var loc = new Object({
                        street:  occurrences[i].location.street,
                        city: occurrences[i].location.city,
                        neighborhood:  occurrences[i].location.neighborhood,
                        state:  occurrences[i].location.state,
                        latitude:  occurrences[i].location.latitude,
                        longitude:  occurrences[i].location.longitude
                    });
                    
                    var occur = new Occurrence({
                        _id         : occurrences[i]._id,
                        title       : occurrences[i].title,
                        location    : loc,
                        date        : occurrences[i].date,
                        hour        : occurrences[i].hour,
                        crimeType   : occurrences[i].crimeType,
                        description : occurrences[i].description
                    });
                    occs.push(occur);
				}
				return res.send(occs);
                //return res.send(occurrences);
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
                    _id         : occurrence._id,
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
    


	findByCrimeType = function(req, res) {
		console.log("GET - /Teste");
		return Occurrence.find({'crimeType': req.params.crimeType}, function(err, results)  {
			if(!err) {
				return res.send(results);
			} else {
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
				return res.send({ error: 'Server error' });
			}
		})   ;
	};
	
	findByLocation = function(req, res) {
		var locationType = req.params.locationType;
		var nome = req.params.nome;
		
		return Occurrence.find( function(err, results)  {
			if(!err) {
				var resp = [];
				for(var i = 0; i < results.length; ++i){
					if(results[i]['location'] && results[i]['location'][locationType] == nome){
						resp.push(results[i]);
					}
				}
			
				return res.send(resp);
			} else {
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
				return res.send({ error: 'Server error' });
			}
		});
	};
	findByYMD = function(req, res) {
		
		return Occurrence.find( function(err, results)  {
			if(!err) {
				var resp = [];
				for(var i = 0; i < results.length; ++i){
					var today, someday;
					if(results[i]['date']){
					//(year, month, day, hours, minutes, seconds, milliseconds)
					today = new Date(req.params.year, req.params.month-1, req.params.day);
					someday = new Date(results[i].date.getFullYear(), results[i].date.getMonth(), results[i].date.getDate());
					//console.log("Param: "+ today.getFullYear() + "\\"+today.getMonth()+"\\"+today.getDate());
					//console.log("Banco: " +someday.getFullYear() + "\\"+someday.getMonth()+"\\"+someday.getDate());
					//console.log("\n\n");
						if(someday >= today){
							resp.push(results[i]);
						}
					}
				}
				return res.send(resp);
			} else {
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
				return res.send({ error: 'Server error' });
			}
		});
	};
	
	
	
	/*findByLocationCidade = function(req, res) {
		
		
		console.log("GET - /Location");
		return Occurrence.find({'location': req.params.location.cidade}, function(err, results)  {
			if(!err) {
				return res.send(results);
			} else {
				res.statusCode = 500;
				console.log('Internal error(%d): %s',res.statusCode,err.message);
				return res.send({ error: 'Server error' });
			}
		});
	};*/
	
	
	


    /**
   * Cria uma nova ocorrencia
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
    addOccurrence = function(req, res) {

        console.log('POST - /occurrence');
		//req.body.date = new Date(1990,10,12);
        var occurrence = new Occurrence({
            title       : req.body.title,
            location    : req.body.location,

            date        : req.body.date,
            hour        : req.body.hour,
            crimeType   : req.body.crimeType,
            description : req.body.description,
         
        });

        occurrence.save(function(err) {

            if(err) {

                console.log('Error while saving occurrence: ' + err);
                res.send({ error:err });
                return;

            } else {

                console.log('Occurrence created');
                return res.send(occurrence);

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
    app.get('/occurrence/type/:crimeType', findByCrimeType);
    app.get('/occurrence/location/:locationType/:nome', findByLocation);
    app.get('/occurrence/date/:year/:month/:day', findByYMD);

}
