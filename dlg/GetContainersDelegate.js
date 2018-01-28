var Docker = require('dockerode');
var docker = new Docker();

exports.getContainers = function() {

  return new Promise(function(success, failure) {

    docker.listContainers(function(error, dockerContainers) {

      if (dockerContainers == null) success([]);

      var containers = [];

      for (var i = 0; i < 1; i++) {

        containers.push({id: dockerContainers[i].Id});
      }

      success(containers);

    });
  });
}
