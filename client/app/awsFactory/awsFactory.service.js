'use strict';

angular.module('awsTestApp')
    .factory('awsFactory', function ($http) {
        var urlBase = '/api/ec2Instances';
        var awsFactory = {};

        awsFactory.getInstances = function () {
            return $http.get(urlBase);
        };

        awsFactory.getInstance = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        awsFactory.startInstance = function (ins) {
            console.log('start instance');

            return $http.post(urlBase, {'InstanceId':ins});
        };

        awsFactory.stopInstance = function (id, ins) {
            console.log('stop instance');
            return $http.put(urlBase + '/' + id, ins)
        };

        awsFactory.terminateInstance = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return awsFactory;

    });



