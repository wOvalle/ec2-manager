'use strict';

angular.module('awsTestApp')
  .controller('Ec2InstancesCtrl', function ($scope, awsFactory) {
        $scope.instances = [];


        awsFactory.getInstances.get(function(data){
           console.log(data);
            angular.forEach(data.Reservations,function(res){
                $scope.instances.push(res);
            });

        });
  });
