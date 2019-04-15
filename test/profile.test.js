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
  it('finds by id', () => {
    return Profile.create({ name: 'Charrol', favChar: 'Leela', quote: 'Nibblerz' })
      .then(createdProfile => {
        return request(app)
          .get(`/profiles/${createdProfile._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ name: 'Charrol', favChar: 'Leela', quote: 'Nibblerz', _id: expect.any(String) });
      });
  });

  it('updates profile name', () => {
    return Profile.create({ 
      name: 'Charrol', 
      favChar: 'Leela', 
      quote: 'Nibblerz' 
    })
      .then(createdProfile => {
        return request(app)
          .patch(`/profiles/${createdProfile._id}`)
          .send({
            favChar: 'bender'
          });
      })
      .then(results => {
        expect(results.body).toEqual({
          name: 'Charrol',
          favChar: 'bender',
          quote: expect.any(String),
          _id: expect.any(String)
        });
      });
  });
  it('deletes a profile', () => {
    return Profile.create({ 
      name: 'Charrol', 
      favChar: 'Leela', 
      quote: 'Nibblerz' 
    })
      .then(createdProfile => {
        return request(app)
          .delete(`/profiles/${createdProfile._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({ deleted: 1 });
      });
  });




});
