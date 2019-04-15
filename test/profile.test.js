const request = require('supertest');
const app = require('../lib/app');
const Profile = require('../lib/models/Profile');

describe('profile routes', () => {
  afterEach(() => {
    return Profile.drop();
  });
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

  it('returns all profiles', () => {
    return Profile
      .create({
        name: 'cherrol',
        favChar: 'fry',
        quote: 'shut up and take my money!'
      })
      .then(() => {
        return request(app)
          .get('/profiles')
          .then(response => {
            expect(response.body).toHaveLength(1);
          });
      });
  });
});
