const BbPromise = require('bluebird');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
module.exports = BbPromise.promisifyAll(new AWS.CloudFormation());
