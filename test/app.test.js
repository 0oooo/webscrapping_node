const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
const db = require('../database');

chai.should();
chai.use(chaiHttp);

/* Test the /GET route */
describe('app index route', () => {
    it('it should GET /', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should handle 404 error', (done) => {
        chai.request(app)
            .get('/notExist')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});



/* Test the /GET movie by id  */
describe('Movies:', () => {
  it('it should GET a movie by id : /id', (done) => {
    let sql = "Select * from movie limit 1";
    db.query(sql, function(err, result){
      if(err){
          throw err;
      }

      const id = result[0].id;

        chai.request(app)
            .get('/movies/' + id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });

    });
  });
});


/* Test the /GET all today's movies */
describe('Movies: ', () => {
    it('it should GET all movies from today', (done) => {
        chai.request(app)
            .get('/movies?today=true&page=1&limit=12')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('count');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('movie_name');
                res.body.data[0].should.have.property('description');
                res.body.data[0].should.have.property('image_url');
                done();
            });
    });
});


/* Test the /GET screening by movie id */
describe('Screenings:', () => {
    it('it should GET all screenings for a specific movie', (done) => {
        let sql = "Select * from movie limit 1";
        db.query(sql, function(err, result){
            if(err){
                throw err;
            }

            const movie_id = result[0].id;

        chai.request(app)
            .get('/screenings?movie=' + movie_id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('count');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('screening_id');
                res.body.data[0].should.have.property('screening_datetime');
                res.body.data[0].should.have.property('url');
                res.body.data[0].should.have.property('details');
                res.body.data[0].should.have.property('cinema_name');
                res.body.data[0].should.have.property('company_name');
                done();
            });
        });
    });
});


/* Test the /GET screening by id */
describe('Screenings:', () => {
    it('it should GET a screening with one specific id', (done) => {
        let sql = "Select * from screening limit 1";
        db.query(sql, function(err, result){
            if(err){
                throw err;
            }

            const id = result[0].id;

            chai.request(app)
                .get('/screenings/' + id)  //hard coded. Should change?
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('count');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.data[0].should.have.property('id');
                    res.body.data[0].should.have.property('movie_id');
                    res.body.data[0].should.have.property('cinema_id');
                    res.body.data[0].should.have.property('screening_datetime');
                    res.body.data[0].should.have.property('url');
                    res.body.data[0].should.have.property('details');
                    done();
                });
        });
    });
});

/* Test the /GET cinemas by company name */
describe('Cinemas:', () => {
    it('it should GET all the cinemas for given company', (done) => {
        let sql = "Select * from cinema limit 1";
        db.query(sql, function(err, result) {
            if (err) {
                throw err;
            }

            const company = result[0].company_name;

            chai.request(app)
                .get('/cinemas?company=' + company)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('count');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.data[0].should.have.property('id');
                    res.body.data[0].should.have.property('cinema_name');
                    res.body.data[0].should.have.property('address');
                    res.body.data[0].should.have.property('phone');
                    res.body.data[0].should.have.property('company_name');
                    res.body.data[0].should.have.property('active');
                    done();
                });
        });
    });
});
