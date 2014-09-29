'use strict';

describe('Controller: Ec2InstancesCtrl', function () {

  // load the controller's module
  beforeEach(module('awsTestApp'));

  var Ec2InstancesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Ec2InstancesCtrl = $controller('Ec2InstancesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
