var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

exports.getContainers = function() {

  return new Promise(function(success, failure) {

    docker.listContainers(function(error, dockerContainers) {

      if (dockerContainers == null) success([]);

      var containers = [];

      for (var i = 0; i < dockerContainers.length; i++) {

        containers.push({id: dockerContainers[i].Id});
      }

      success(containers);

    });
  });
}
