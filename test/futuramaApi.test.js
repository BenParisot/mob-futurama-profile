const { getQuoteByChar } = require('../lib/services/futuramaApi');

describe('futurama api', () => {
  it('generates a random quote', () => {
    const profile = {
      name: 'amy',
      favChar: 'bender',
    };
    return getQuoteByChar(profile)
      .then(result => {
        expect(result).toEqual(expect.any(String));
      });
  });
});
