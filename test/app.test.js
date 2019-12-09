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
describe('movies', () => {
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
describe('movies', () => {
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


/* Test the /GET all today's screenings */
describe('movies', () => {
    // describe('get by id', () => {
    it('it should GET all screenings from today', (done) => {
        chai.request(app)
            .get('/screenings?date=2019-12-09')  //hard coded. Should change?
            .end((err, res) => {
                console.info(res);
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('count');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('cinema_id');
                res.body.data[0].should.have.property('screening_datetime');
                res.body.data[0].should.have.property('url');
                res.body.data[0].should.have.property('details');
                done();
            });
    });
});