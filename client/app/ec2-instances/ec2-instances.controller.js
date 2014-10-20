'use strict';

angular.module('awsTestApp')
    .controller('Ec2InstancesCtrl', function ($scope, awsFactory, $modal) {
        $scope.instances = [];

        var loadingModal = $modal.open({
            templateUrl: 'app/ec2-instances/loading.html',
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
            loadingModal.dismiss('cancel');
            angular.forEach(data.Reservations, function (res) {
                res.Instances[0].InstanceName = '';
                var arr = res.Instances[0].Tags;
//                Check Tag object 'Name' and set it to InstanceName
                for (var i = 0; i < arr.length; i++) if (arr[i].Key == "Name") res.Instances[0].InstanceName = arr[i].Value;

                $scope.instances.push(res);
            });

        });

        $scope.terminate = function (i) {
            alert('Terminate ' + i.Instances[0].KeyName);
        }

        $scope.stop = function (i) {
            alert('Stop ' + i.Instances[0].KeyName);
        }

        $scope.details = function () {
            alert('Details');
        }
    }
);
