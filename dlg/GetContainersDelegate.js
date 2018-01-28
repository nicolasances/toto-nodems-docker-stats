var Docker = require('dockerode');
var docker = new Docker();

exports.getContainers = function() {

  return new Promise(function(success, failure) {

    docker.listContainers(function(error, dockerContainers) {

      if (dockerContainers == null) success([]);

      var containers = [];

      for (var i = 0; i < dockerContainers.length; i++) {

        containers.push({id: dockerContainers[i].Id});
      }

      console.log(containers);

      success(containers);

    });
  });
}
