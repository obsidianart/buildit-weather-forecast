const assert = require('assert')
const fs = require('fs');
//const fetchMock = require('fetch-mock')
 
//const API_JSON_RESPONSE = JSON.parse(fs.readFileSync(__dirname+ '/fixtures/forecast-api-response.json', 'utf8'))


module.exports = {
  // beforeEach : function() {
  //   fetchMock.get('*', {})
  //   console.log("mocking fetch")
  // },

  // afterEach: function() {
  //   fetchMock.restore()
  // },

  'Get forecast' : function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('[data-reactroot]', 1000) //Ensure React has bootstrap
      .assert.title('Weather forecast App')
      .assert.containsText('h1','London')
      .pause(1000) //Hopefully enough for the results to arrive, this wouldn't happen with a mock server
      .click('#day-selector li:nth-child(2)')
      .pause(500)
      .elements('css selector', '#forecast-by-day > div > div', function (result) {
        client.assert.equal(result.value.length, 8, 'All forecast for tomorrow are present')
      })
      .end()
  },

  'Type hello' : function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('[data-reactroot]', 1000) //Ensure React has bootstrap
      .setValue('input[type=text]', ['Hello', client.Keys.ENTER])
      .pause(1000) //Allow the "AI" to answer
      .assert.containsText('#answer','Hello to you')
      .end()
  }
}