const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

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
    // describe('get by id', () => {
        it('it should GET /id', (done) => {
            chai.request(app)
                .get('/movies/63')                    // hard coded. Should change?
                .end((err, res) => {
                    console.info(res);
                    res.should.have.status(200);
                    done();
                });
        });
});


/* Test the /GET all today's movies */
describe('Movies: ', () => {
    // describe('get by id', () => {
    it('it should GET all movies from today', (done) => {
        chai.request(app)
            .get('/movies?today=true&page=1&limit=12')
            .end((err, res) => {
                console.info(res);
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


/* Test the /GET screening by movie id and company name */
describe('Screenings:', () => {
    // describe('get by id', () => {
    it('it should GET all screenings for a specific movie for a specific company', (done) => {
        chai.request(app)
            .get('/screenings?movie=35&company=Vue&limit=10&page=1')  //hard coded. Should change?
            .end((err, res) => {
                console.info(res);
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
                res.body.data[0].should.have.property('cinema_name');
                res.body.data[0].should.have.property('address');
                res.body.data[0].should.have.property('phone');
                res.body.data[0].should.have.property('company_name');
                res.body.data[0].should.have.property('cinema_url_name');
                res.body.data[0].should.have.property('active');
                done();
            });
    });
});



/* Test the /GET screening by date */
describe('Screenings:', () => {
    // describe('get by id', () => {
    it('it should GET all screenings from specified date', (done) => {
        chai.request(app)
            .get('/screenings/2019-12-09?limit=10&page=1')  //hard coded. Should change?
            .end((err, res) => {
                console.info(res);
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


/* Test the /GET screening by id */
describe('Screenings:', () => {
    // describe('get by id', () => {
    it('it should GET a screening with one specific id', (done) => {
        chai.request(app)
            .get('/screenings/65')  //hard coded. Should change?
            .end((err, res) => {
                console.info(res);
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