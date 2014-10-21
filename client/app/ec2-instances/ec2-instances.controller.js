'use strict';

angular.module('awsTestApp')
    .controller('Ec2InstancesCtrl', function ($scope, awsFactory, $modal, $rootScope) {
        $scope.instances = [];
        var lModal;
        var singleInstanceModal;

        loadingModal();

        getInstances();

        function getInstances() {
            awsFactory.getInstances()
                .success(function (data) {
//                  When data comes from the server, dismiss loadingModal
                    lModal.dismiss('cancel');
//                  Iterate over the instances (Reservations) to set the InstanceName

                    angular.forEach(data.Reservations, function (res) {
                        res.Instances[0].InstanceName = '';
                        var arr = res.Instances[0].Tags;
//                      Check Tag object 'Name' and set it to InstanceName

                        for (var i = 0; i < arr.length; i++)
                            if (arr[i].Key == "Name")
                                res.Instances[0].InstanceName = arr[i].Value;

                        $scope.instances.push(res);
                    });
                })
                .error(function (error) {

                });
        };
        function loadingModal() {
//        Open loading Modal when page loads
            lModal = $modal.open({
                templateUrl: 'app/ec2-instances/loading.html',
                size: 'sm',
                backdrop: 'static',
                keyboard: false
            });
        };


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
        };
    }
)

    .controller('instanceModalCtrl', function ($scope, $modalInstance, instance, $rootScope, awsFactory) {

        $scope.terminate = function (instance) {
            awsFactory.terminateInstance($rootScope.selectedInstance.Instances[0].InstanceId)
                .success(function (data) {
                    alert('Instance terminated');
                    console.log(data);
                })
                .error(function (error) {
                    alert('error' + error);
                });
        };

        $scope.stop = function (instance) {
            awsFactory.stopInstance($rootScope.selectedInstance.Instances[0].InstanceId)
                .success(function (data) {
                    alert('Instance stopped');
                })
                .error(function (error) {
                    alert('error' + error);
                });

        };

    });
