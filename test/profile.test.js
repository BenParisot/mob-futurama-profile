const request = require('supertest');
const app = require('../lib/app');

describe('profile routes', () => {
  it('creates profile', () => {
    return request(app)
      .post('/profiles')
      .send({ 
        name: 'sharol', 
        favChar: 'bender', 
        quote: 'drink booze' 
      })
      .then(res => {
        expect(res.body).toEqual({ 
          name: 'sharol', 
          favChar: 'bender', 
          quote: 'drink booze',
          _id: expect.any(String)
        });
      });
  });
});
