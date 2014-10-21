'use strict';

angular.module('awsTestApp')
    .factory('awsFactory', function ($resource) {
        // Public API here
        return {
            getInstances: $resource("/api/ec2Instances", {id: "@id"}),
            terminateInstance: $resource("/api/ec2Instances/:id", {id: "@id"}),
            stopInstance: $resource('/api/ec2Instances/:id', { id: '@_id' }, {
                update: {
                    method: 'PUT'
                }
            })
        }
    });



