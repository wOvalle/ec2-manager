'use strict';

var ec2 = require('./ec2Instances.model');
var aws = require('aws-sdk');


// Get list of ec2Instancess
exports.index = function(req, res) {
    var arr = [];

    var ec2 = new aws.EC2({apiVersion: '2014-06-15'});

    var params = {};

    ec2.describeInstances(params, function(err, data) {
        if (err)
            handleError(res,err); // an error occurred
        else { // successful response
            if(!data) handleError(res,err);
            res.json(data);
        }
    });

};

// Get a single ec2Instances
exports.show = function(req, res) {
    var params = {};
    params.InstanceIds = [];
    params.InstanceIds.push(req.params.id);

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
    ec2.create(req.body, function(err, ec2Instances) {
        if(err) { return handleError(res, err); }
        return res.json(201, ec2Instances);
    });
};

// Updates an existing ec2Instances in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    ec2.findById(req.params.id, function (err, ec2Instances) {
        if (err) { return handleError(res, err); }
        if(!ec2Instances) { return res.send(404); }
        var updated = _.merge(ec2Instances, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, ec2Instances);
        });
    });
};

// Deletes a ec2Instances from the DB.
exports.terminate = function(req, res) {
    ec2.findById(req.params.id, function (err, ec2Instances) {
        if(err) { return handleError(res, err); }
        if(!ec2Instances) { return res.send(404); }
        ec2Instances.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}