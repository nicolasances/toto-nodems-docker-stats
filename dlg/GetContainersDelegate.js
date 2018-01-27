var http = require('request');

exports.getContainers = function() {

  return new Promise(function(success, failure) {

    var data = {
      url : "http://unix:/var/run/docker.sock:http:/v1.24/containers/json",
      headers : {
        'User-Agent' : 'node.js',
        'Accept' : 'application/json'
      }
    };

    http.get(data, function(error, response, body) {

      var data = JSON.parse(body);

      if (data == null) success([]);

      var containers = [];

      for (var i = 0; i < data.length; i++) {

        containers.push({id: data[i].Id});
      }

      success(containers);

    });
  });
}
