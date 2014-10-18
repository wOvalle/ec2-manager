'use strict';

angular.module('awsTestApp')
  .factory('awsFactory', function ($resource) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      getInstances: $resource("/api/ec2Instances", {id: "@id"})
      }
    });
