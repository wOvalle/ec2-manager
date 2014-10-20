'use strict';

angular.module('awsTestApp')
    .controller('Ec2InstancesCtrl', function ($scope, awsFactory, $modal) {
        $scope.instances = [];
        var loadingModal;
        var singleInstanceModal;
        loadingModal = $modal.open({
            templateUrl: 'app/ec2-instances/loading.html',
            size: 'sm',
            backdrop: 'static',
            keyboard: false
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

        $scope.details = function (ins) {
            $scope.selectedInstance = ins;
            singleInstanceModal = $modal.open({
                templateUrl: 'app/ec2-instances/instance.html',
                size: 'sm',
                controller: 'instanceModalCtrl',
                resolve: {
                    instance: function () {
                        return $scope.selectedInstance;
                    }
                }
            });
        }
    }
)

    .controller('instanceModalCtrl', function ($scope, $modalInstance, instance) {
        $scope.terminate = function (ins) {
            alert('Terminate ');
//            console.log(ins);
        };

        $scope.stop = function (ins) {
            alert('Stop ');
            console.log(ins);
        };

    });
