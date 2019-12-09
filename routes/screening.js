let express = require('express');
require('../http-status');
let router = express.Router();
let db = require('../database');

/* GET screening listing. (GET All screenings) */
router.get('/', function(request, response, next) {
  let page = request.query.page;
  let limit = request.query.limit;

  let sql = "SELECT * FROM screening ";

  if(limit !== undefined && page !== undefined ){
    sql += "ORDER BY id LIMIT " + limit + " OFFSET " + --page * limit;
  }

  db.query(sql, function (err, result) {
    if (err){
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({'error': true, 'message': + err});
      // return;
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
      // return;
      next();
    }

    response.json({
      count: result.length,
      data: result
    });
  });

});

/* GET screening by movie id. (GET specific screening) */
router.get('/', function(request, response, next) {
  let page = request.query.page;
  let limit = request.query.limit;
  let movie_id = request.query.movie;
  let sql = "SELECT * FROM screening WHERE movie_id = " + movie_id;

  if(limit !== undefined && page !== undefined ){
    sql += "ORDER BY id LIMIT " + limit + " OFFSET " + --page * limit;
  }

  db.query(sql, function (err, result) {
    if (err){
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({'error': true, 'message': + err});
      // return;
      next();
    }

    response.json({
      count: result.length,
      data: result
    });
  });

});


/* GET screening by date. (GET specific screening) */
router.get('/', function(request, response, next) {
  let page = request.query.page;
  let limit = request.query.limit;
  let date = request.query.screeningDate;
  let sql = "SELECT * FROM screening WHERE DATE(screening_datetime) = " + date;

  if(limit !== undefined && page !== undefined ){
    sql += "ORDER BY id LIMIT " + limit + " OFFSET " + --page * limit;
  }

  db.query(sql, function (err, result) {
    if (err){
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({'error': true, 'message': + err});
      // return;
      next();
    }

    response.json({
      count: result.length,
      data: result
    });
  });

});


module.exports = router;
