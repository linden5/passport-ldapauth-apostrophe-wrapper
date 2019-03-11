var expect = require('chai').expect;
var package = require('../lib');

describe('package has proper exports', function () {
  it('package has proper exports', function () {
    expect(package).to.be.an('function');
    expect(package.Strategy).to.be.an('function');
  });
});
