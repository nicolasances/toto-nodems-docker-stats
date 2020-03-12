var Controller = require('toto-api-controller');

var getDockerStats = require('./dlg/GetDockerStatsDelegate');

var apiName = 'docker-stats';

var api = new Controller(apiName);

api.path('GET', '/stats', getDockerStats);

api.listen();
