module.exports = function () {
  this.Given(/^I visit MoneyHub$/, function () {
    return this.driver.get('https://app.moneyhub.co.uk/wealth-tracker/login')
  });

  var LoginForm = this.Widget.extend({
    root: 'form',
    login: function (email, password) {
      this.fill({
        selector: 'input[name="email"]',
        value: email
      });

      this.fill({
        selector: 'input[name="discard"]',
        value: password
      });

      return this.click('button');
    }
  });

  var Tile = function (Widget, id) {
    return Widget.extend({
      root: '#' + id,
      follow: function () {
        return this.click('span');
      }
    });
  }

  this.When(/^I log in$/, function () {
    var form = new LoginForm();

    return form.find().then(function (widget) {
      return form.login('thomas.hicks1@googlemail.com', 'password123');
    });
  });

  this.When(/^I click the liability tile$/, function () {
    var liabilityTile = new (Tile(this.Widget, 'liability'));
    return liabilityTile.follow();
  });

  this.Then(/^I should see my debt information$/, function () {
    return this.Widget.getText({
      selector: 'h1 span.current'
    }).then(function (text) {
      text.should.equal("Debts")
    });
  });
}
