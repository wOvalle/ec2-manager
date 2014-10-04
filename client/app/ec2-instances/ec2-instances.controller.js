'use strict';

angular.module('awsTestApp')
  .controller('Ec2InstancesCtrl', function ($scope, amazonCreds) {
$scope.message = amazonCreds.key;
        //TODO: Remove hardcoded credentials
  AWS.config.update({accessKeyId: '', secretAccessKey: ''});
  AWS.config.region= 'us-east-1';
        var bucket = new AWS.S3({params: {Bucket: 'ec2-manager'}});
        $scope.objects = [];
        this.variable = "variable123";
        bucket.listObjects(function (err, data) {
            if (err) {
                console.log('Error');
            } else {
                console.log('Loaded ' + data.Contents.length + ' items from S3');
                console.log(data);
                for (var i = 0; i < data.Contents.length; i++) {
                    $scope.objects.push(data.Contents[i].Key);
                    console.log(data.Contents[i].Key);
                    $scope.$apply();
                }
            }
        });

  });
