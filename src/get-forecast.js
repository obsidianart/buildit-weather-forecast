var assert = require('assert')

module.exports = {
  'Display movies' : function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('[data-reactroot]', 1000) //Ensure React has bootstrap
      .assert.title('Vvoosh test')
      .assert.containsText('h4','Company') 
      .assert.containsText('a.movie','Name: Cars') 
      .assert.containsText('a.movie','Company: Pixar')
      .elements('css selector','a.movie', function (result) {
		    client.assert.equal(result.value.length, 6, 'All movies are present');
	    })
      .end()
  },

  'Filter movies by company' : function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('[data-reactroot]', 1000) //Ensure React has bootstrap
      .click('select option[value="Dreamworks"]')
      .pause(100) //if possible change this with an active wait
      .assert.containsText('a.movie','Name: How to Train Your Dragon') 
      .assert.containsText('a.movie','Company: Dreamworks')
      .elements('css selector','a.movie', function (result) {
        client.assert.equal(result.value.length, 3, '3 movies are present');
      })
      .end()
  },

  'Filter movies by company then All' : function (client) {
    client
      .url(client.launchUrl)
      .waitForElementVisible('[data-reactroot]', 1000) //Ensure React has bootstrap
      .click('select option[value="Dreamworks"]')
      .pause(100) //if possible change this with an active wait
      .click('select option[value="All"]')
      .pause(100) //if possible change this with an active wait
      .elements('css selector','a.movie', function (result) {
        client.assert.equal(result.value.length, 6, 'All movies are present');
      })
      .end()
  }
}