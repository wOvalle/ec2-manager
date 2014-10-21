'use strict';

angular.module('awsTestApp')
    .controller('Ec2InstancesCtrl', function ($scope, awsFactory, $modal, $rootScope) {
        $scope.instances = [];
        var loadingModal;
        var singleInstanceModal;

//        Open loading Modal when page loads
        loadingModal = $modal.open({
            templateUrl: 'app/ec2-instances/loading.html',
            size: 'sm',
            backdrop: 'static',
            keyboard: false
        });

        awsFactory.getInstances.get(function (data) {
//            When data comes from the server, dismiss loadingModal
            loadingModal.dismiss('cancel');
//            Iterate over the instances (Reservations) to set the InstanceName
            angular.forEach(data.Reservations, function (res) {
                res.Instances[0].InstanceName = '';
                var arr = res.Instances[0].Tags;
//                Check Tag object 'Name' and set it to InstanceName
                for (var i = 0; i < arr.length; i++) if (arr[i].Key == "Name") res.Instances[0].InstanceName = arr[i].Value;

                $scope.instances.push(res);
            });
        });

        $scope.details = function (ins) {
//            insert selectedInstance in a $rootScope variable
            $rootScope.selectedInstance = ins;
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

    .controller('instanceModalCtrl', function ($scope, $modalInstance, instance, $rootScope) {
        $scope.terminate = function (instance) {
            alert('Terminate ');
            console.log($rootScope.selectedInstance);
        };

        $scope.stop = function (instance) {
            alert('Stop ');

            awsFactory.stopInstance.save(function (data) {
            });
        };

    });
