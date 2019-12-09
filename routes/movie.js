let express = require('express');
let router = express.Router();
let db = require('../database');
const date = require('../date');

require('../http-status');



/* GET movie listing. (GET All movies) */
router.get('/', function(request, response, next) {
  let page = request.query.page;
  let limit = request.query.limit;
  let today = request.query.today;

  let query = "SELECT * FROM movie ";
  let total = "SELECT COUNT(id) as total FROM movie ";

  if(today){
    total += " WHERE id IN (SELECT movie_id FROM screening WHERE Date(screening_datetime) = '" + date() + "') ";
    query += " WHERE id IN (SELECT movie_id FROM screening WHERE Date(screening_datetime) = '" + date() + "') ";
  }

  if(limit !== undefined && page !== undefined ){
    query += "ORDER BY id LIMIT " + limit + " OFFSET " + --page * limit;
  }
  console.log("My Query " + query);

  db.query(query, function (err, query_result) {
    if (err){
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({'error': true, 'message': + err});
      next();
    }
    db.query(total, function (err, count_result) {
      if (err){
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        response.json({'error': true, 'message': + err});
        next();
      }

      response.json({
        count: query_result.length,           // count of the current query
        total: count_result.pop().total,      // total number of results
        data: query_result                    // current result
      });
    });


  });
});

/* GET movie listing. (GET All movies) */
router.get('/total', function(request, response, next) {
  let today = request.query.today;
  let count = "SELECT COUNT(id) as total FROM movie ";

  if(today){
    count += " WHERE id IN (SELECT movie_id FROM screening WHERE Date(screening_datetime) = '" + date() + "') ";
  }

  db.query(count, function (err, result) {
    if (err){
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      response.json({'error': true, 'message': + err});
      // return;
      next();
    }

    response.json({
      data: result
    });
  });
});

/* GET movie by id. (GET specific movie) */
router.get('/:id', function(request, response, next) {
  let id = request.params.id;
  let sql = "SELECT * FROM movie WHERE id = " + id;

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

/* GET movie by name. (GET specific movie) */
router.get('/:name', function(request, response, next) {
  let name = request.params.name;
  let sql = "SELECT * FROM movie WHERE name = " + name;

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
