'use strict';

angular.module('awsTestApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ec2-instances', {
                url: '/ec2-instances',
                templateUrl: 'app/ec2-instances/ec2-instances.html',
                controller: 'Ec2InstancesCtrl',
                controllerAs: 'ec2',
                authenticate: true
            });
    });