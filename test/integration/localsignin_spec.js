var firefox = require('selenium-webdriver/firefox');

describe('Integration login test using local strategy - ', function () {

  var driver;

  beforeEach(function() {
    driver = new firefox.Driver();
  });

  jasmine.getEnv().defaultTimeoutInterval = 150000;

  it('Must return (Invalid user or password.) message when password be wrong', function(done) {
    driver.get('http://localhost:3000');
    driver.findElement({ id : 'local' }).click();
    driver.findElement({ name : 'username'}).sendKeys('developer');
    driver.findElement({ name : 'password'}).sendKeys('0102');
    driver.findElement({ name : 'login'}).click();
    var messageBox = driver.findElement({ id : 'loginMessage'});
    messageBox.getInnerHtml().then(function(value) {
      expect(value).toBe('Invalid user or password.');
      done();
    });
  });

  it('Must return (Invalid user or password.) message when username be wrong', function(done) {
    driver.get('http://localhost:3000');
    driver.findElement({ id : 'local' }).click();
    driver.findElement({ name : 'username'}).sendKeys('develo');
    driver.findElement({ name : 'password'}).sendKeys('010203');
    driver.findElement({ name : 'login'}).click();
    var message = driver.findElement({ id : 'loginMessage'});
    message.getInnerHtml().then(function(value) {
      expect(value).toBe('Invalid user or password.');
      done();
    });
  });

  it('Must return username logged on page', function(done) {
    driver.get('http://localhost:3000');
    driver.findElement({ id : 'local' }).click();
    driver.findElement({ name : 'username'}).sendKeys('developer');
    driver.findElement({ name : 'password'}).sendKeys('010203');
    driver.findElement({ name : 'login'}).click();
    var message = driver.findElement({ id : 'userlogged'});
    message.getInnerHtml().then(function(value) {
      expect(value).toBe('developer');
      done();
    });
  });

  it('Must return true if after logout the link to login using local strategy is visible', function(done) {
    driver.get('http://localhost:3000');
    driver.findElement({ id : 'local' }).click();
    driver.findElement({ name : 'username'}).sendKeys('developer');
    driver.findElement({ name : 'password'}).sendKeys('010203');
    driver.findElement({ name : 'login'}).click();
    driver.findElement({ id : 'logout'}).click();
    driver.findElement({ id : 'local' })
      .isDisplayed()
      .then(function(value) {
        expect(value).toBe(true);
        done();
      });
  });
});
