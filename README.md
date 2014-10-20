aws-test
========

MEAN + AWS Javascript library 

## What's aws-test?

This is my final project of Enterprise Computing (NSSA60203.2141) (RIT-NSSA). It's a web application built in top of MEAN Stack (MongoDB, ExpressJS, AngularJS and NodeJS) with help of Yeoman, Bootstrap-ui and Amazon Web Services's NodeJS SDK. It's an Elastic Computing Cloud (EC2 from now on) manager created to query and Manage EC2 Instances.

## Installation

* Clone the repo: `git clone https://github.com/wOvalle/aws-test.git`
* or Download the .zip source code

Then run `npm install && bower install`

You have to create a file called local.env.js in aws-test\server\config with the same layout than local.env.sample.js and set your AMAZON_ID and  AMAZON_SECRET with your id and secret from Amazon (if you don't know how to get this, please refer to [AWS Documentation](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html)

After everything is installed, just run `grunt serve` to test the app.



 