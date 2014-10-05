'use strict';

var ec2 = require('./ec2Instances.model');
var aws = require('aws-sdk');

// Get list of ec2Instancess
exports.index = function(req, res) {
    var arr = ['test'];
    return res.json(200, arr);
};

// Get a single ec2Instances
exports.show = function(req, res) {
    var arr = ['hola', 'adios'];
    return res.json(arr[req.params.id]);

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
exports.destroy = function(req, res) {
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