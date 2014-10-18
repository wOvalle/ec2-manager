'use strict';

describe('Service: awsFactory', function () {

  // load the service's module
  beforeEach(module('awsTestApp'));

  // instantiate service
  var awsFactory;
  beforeEach(inject(function (_awsFactory_) {
    awsFactory = _awsFactory_;
  }));

  it('should do something', function () {
    expect(!!awsFactory).toBe(true);
  });

});
