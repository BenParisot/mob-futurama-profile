const request = require('superagent');

function getQuoteByChar(profile) {
  const nameArray = profile.favChar.split(' ');
  const kabobName = nameArray.join('-');
  const url = `futuramaapi.herokuapp.com/api/characters/${kabobName}/1`;
  return request
    .get(url)
    .then(response => {
      return response.body[0].quote;
    });
}

module.exports = {
  getQuoteByChar
};
