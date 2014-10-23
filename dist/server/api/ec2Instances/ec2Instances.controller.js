'use strict';

var ec2 = require('./ec2Instances.model');
var aws = require('aws-sdk');


// Get list of ec2Instancess
exports.index = function(req, res) {

        var ec2 = new aws.EC2({apiVersion: '2014-06-15'});

        var params = {};

        ec2.describeInstances(params, function(err, data) {
            if (err)
                handleError(res,err); // an error occurred
            else { // successful response
                if(!data) handleError(res,err);
                console.log(data.Reservations);
                res.json(data);
            }
        });




};

// Get a single ec2Instances
exports.show = function(req, res) {
    var params = {};
    params.InstanceIds = [];
    params.InstanceIds.push(req.params.id);
//    params.InstanceIds.push('i-3ca15fd7');

    var ec2 = new aws.EC2({apiVersion: '2014-06-15'});

    ec2.describeInstances(params, function(err, data) {
        if (err)
            handleError(res,err); // an error occurred
        else { // successful response
            if(!data) handleError(res,err);
            res.json(data);
        }
    });
};

// Creates a new ec2Instances in the DB.
exports.create = function(req, res) {
    //TODO: code to create an instance
};

// Deletes a ec2Instances from the DB.
exports.terminate = function(req, res) {
    var params = {};
    params.InstanceIds = [];
    params.InstanceIds.push(req.params.id);
    var ec2 = new aws.EC2({apiVersion: '2014-06-15'});
//    ec2.terminateInstances(params, function(err, data) {
//        if (err) console.log(err, err.stack); // an error occurred
//        else     console.log(data);           // successful response
//    });
    console.log('terminate ' + req.params.id);
};

// Stop a ec2Instance
exports.stop = function(req, res) {
    var params = {};
    params.InstanceIds = [];
    params.InstanceIds.push(req.params.id);
    var ec2 = new aws.EC2({apiVersion: '2014-06-15'});

    ec2.stopInstances(params, function(err, data) {
        if (err) handleError(res,err); // an error occurred
        else {
            if (!data) handleError(res, err);
            res.json(data);          // successful response
        }
    });

};

// start a ec2Instance
exports.start = function(req, res) {
    var params = {};
    params.InstanceIds = [];
    params.InstanceIds.push(req.body.InstanceId);
    var ec2 = new aws.EC2({apiVersion: '2014-06-15'});

    ec2.startInstances(params, function(err, data) {
        if (err) handleError(res,err); // an error occurred
        else {
            if (!data) handleError(res, err);
            res.json(data);          // successful response
        }
    });

};

function handleError(res, err) {
    return res.send(500, err);
}