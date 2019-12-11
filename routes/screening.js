let express = require('express');
require('../http-status');
let router = express.Router();
let db = require('../database');

/* GET screening by movie id. (GET specific screening) */
router.get('/', function(request, response, next) {
  let page = request.query.page;
  let limit = request.query.limit;
  let movie = request.query.movie;

  let sql = "SELECT s.id as screening_id, s.screening_datetime, s.url, s.details, c.cinema_name, c.company_name FROM screening s, cinema c ";

  if(movie !== undefined){
    sql += "WHERE s.cinema_id = c.id AND movie_id = " + movie;
  }

  if(limit !== undefined && page !== undefined ){
    sql += "ORDER BY s.id LIMIT " + limit + " OFFSET " + --page * limit;
  }

  db.query(sql, function (err, result) {
    if (err){
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({'error': true, 'message': + err});
      next();
    }

    response.json({
      count: result.length,
      data: result
    });
  });

});



/* GET screening by id. (GET specific screening) */
router.get('/:id', function(request, response, next) {
  let id = request.params.id;
  let sql = "SELECT * FROM screening WHERE id = " + id;

  db.query(sql, function (err, result) {
    if (err){
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({'error': true, 'message': + err});
      next();
    }

    response.json({
      count: result.length,
      data: result
    });
  });

});

/* GET screening by date. (GET specific screening) */
router.get('/:screeningDate', function(request, response, next) {
  let page = request.query.page;
  let limit = request.query.limit;
  let screeningDate = request.params.screeningDate;

  let sql = "SELECT * FROM screening WHERE DATE(screening_datetime) = '" + screeningDate + "' ";

  if(limit !== undefined && page !== undefined ){
    sql += " ORDER BY id LIMIT " + limit + " OFFSET " + --page * limit;
  }

  db.query(sql, function (err, result) {
    if (err){
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({'error': true, 'message': + err});
      next();
    }


    console.log("-----------------------------------------------------------------------SQL: ", sql, "-----------------------------------------------------------------");
    response.json({
      count: result.length,
      data: result
    });
  });

});


module.exports = router;
