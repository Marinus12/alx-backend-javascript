const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', function() {
  it('should return data when success is true', function(done) {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        expect(response).to.deep.equal({ data: 'Successful response from the API' });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should reject when success is false', function(done) {
    getPaymentTokenFromAPI(false)
      .then(() => {
        done(new Error('Promise should not resolve when success is false'));
      })
      .catch(() => {
        done();
      });
  });
});
