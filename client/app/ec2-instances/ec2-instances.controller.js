'use strict';

angular.module('awsTestApp')
    .controller('Ec2InstancesCtrl', function ($scope, awsFactory, $modal) {
        $scope.instances = [];


        var modalInstance = $modal.open({
            templateUrl: 'modal.html',
            size: 'sm',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        awsFactory.getInstances.get(function (data) {
            modalInstance.dismiss('cancel');
            angular.forEach(data.Reservations, function (res) {
                res.Instances[0].InstanceName = '';
                var arr = res.Instances[0].Tags;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].Key == "Name") {
                        res.Instances[0].InstanceName = arr[i].Value;
                        console.log(res.Instances[0].InstanceName + "-----------" + res.Instances[0].KeyName);
                    }

                }

                $scope.instances.push(res);
            });

        });

        $scope.terminate = function () {
            alert('Terminated');
        }

        $scope.stop = function () {
            alert('Stop');
        }

        $scope.details = function () {
            alert('Details');
        }
    }
);
