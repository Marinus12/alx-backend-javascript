const request = require('request');
const { expect } = require('chai');

describe('API tests', () => {
    const baseUrl = 'http://localhost:7865';

    describe('Index page', () => {
        it('should return status code 200', (done) => {
            request.get(`${baseUrl}/`, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('should return the correct message', (done) => {
            request.get(`${baseUrl}/`, (error, response, body) => {
                expect(body).to.equal('Welcome to the payment system');
                done();
            });
        });
    });

    describe('Cart page', () => {
        it('should return status code 200 for valid id', (done) => {
            request.get(`${baseUrl}/cart/12`, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal('Payment methods for cart 12');
                done();
            });
        });

        it('should return status code 404 for invalid id', (done) => {
            request.get(`${baseUrl}/cart/hello`, (error, response, body) => {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('/available_payments endpoint', () => {
        it('should return the correct payment methods', (done) => {
            request.get(`${baseUrl}/available_payments`, (error, response, body) => {
                const expectedResponse = {
                    payment_methods: {
                        credit_cards: true,
                        paypal: false
                    }
                };
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(body)).to.deep.equal(expectedResponse);
                done();
            });
        });
    });

    describe('/login endpoint', () => {
        it('should return Welcome message with the correct userName', (done) => {
            const options = {
                url: `${baseUrl}/login`,
                json: { userName: 'Betty' }
            };
            request.post(options, (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal('Welcome Betty');
                done();
            });
        });

        it('should return status code 400 when userName is not provided', (done) => {
            const options = {
                url: `${baseUrl}/login`,
                json: {}
            };
            request.post(options, (error, response, body) => {
                expect(response.statusCode).to.equal(400);
                expect(body).to.equal('Missing userName');
                done();
            });
        });
    });
});
