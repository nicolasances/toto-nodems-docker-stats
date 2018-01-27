var http = require('request');

exports.getContainerStats = function(containerId) {

  return new Promise(function(success, failure) {

    var data = {
      url : "http://unix:/var/run/docker.sock:http:/v1.24/containers/" + containerId + "/stats",
      headers : {
        'User-Agent' : 'node.js',
        'Accept' : 'application/json'
      }
    };

    http.get(data, function(error, response, body) {

      var data = JSON.parse(body);

      success({
        containerId: containerId,
        type: getType(data.names),
        name: data.names[0],
        memory: data.memory_status.usage
      });

    });

    /**
     * Retrieves the type of the container (microservice, other)
     */
    var getType = function(names) {

      if (names == null || names.length == 0) return 'other';

      for (var i = 0; i < names.length; i++) {
        if (names[i].indexOf('toto-ms-') > 0 || names[i].indexOf('toto-nodems-') > 0) return 'microservice';
      }

      return 'other';
    }
  });
}
