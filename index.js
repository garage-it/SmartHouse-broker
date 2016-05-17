var argv = require('minimist')(process.argv.slice(2));
var deploy = argv.deploy || 'Local';
var deploymentPath = './' + deploy.charAt(0).toUpperCase() +
                       deploy.slice(1).toLowerCase() + '/';

if(deploy === 'Local') {
  var server = require(deploymentPath + 'server');
}

var publisher = require(deploymentPath + 'publisher');
var subscribe = require(deploymentPath + 'subscribe');
