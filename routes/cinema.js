let express = require('express');
require('../http-status');
let router = express.Router();
let db = require('../database');

/* GET cinema listing. (GET All cinemas) */
router.get('/', function(request, response, next) {
  let page = request.query.page;
  let limit = request.query.limit;

  let sql = "SELECT * FROM cinema ";

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

/* GET cinema by id. (GET specific cinema) */
router.get('/:id', function(request, response, next) {
  let id = request.params.id;
  let sql = "SELECT * FROM cinema WHERE id = " + id;

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