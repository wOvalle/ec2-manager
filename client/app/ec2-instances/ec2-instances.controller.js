'use strict';

angular.module('awsTestApp')
    .controller('Ec2InstancesCtrl', function ($scope, awsFactory, $modal, $rootScope) {
        $scope.instances = [];
        var lModal;
        var singleInstanceModal;

        loadingModal();

        getInstances();

        $scope.refresh = function (){
            $scope.instances = [];
            getInstances();
        };

        $scope.getListClass = function (i){
            if(i % 2){
                return 'list-group-item bg-color';
}
            else{
                return 'list-group-item';
}
        };


        $scope.getBadgeClass = function (sName){
            if(sName === 'running'){
            return 'badge progress-bar-success icon-ok-sign';
}
            else if(sName === 'stopped'){
            return 'badge progress-bar-danger icon-remove-sign';
}
            else{
            return 'badge progress-bar-warning';
}
        };

        function getInstances() {
            awsFactory.getInstances()
                .success(function (data) {
//                  When data comes from the server, dismiss loadingModal
                    lModal.dismiss('cancel');
                    $scope.instances = [];
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
                    console.log($scope.instances);
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
                size: 'lg',
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
            console.log('terminate');
//            awsFactory.terminateInstance($rootScope.selectedInstance.Instances[0].InstanceId)
//                .success(function (data) {
//                    alert('Instance terminated');
//                    console.log(data);
//                })
//                .error(function (error) {
//                    alert('error' + error);
//                });
        };

        $scope.start = function (instance) {
            awsFactory.startInstance($rootScope.selectedInstance.Instances[0].InstanceId)
                .success(function (data) {
                    alert('Instance started');
                })
                .error(function (error, status, headers, config) {
                    alert('error' + error.message);
                    console.log(error);
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
