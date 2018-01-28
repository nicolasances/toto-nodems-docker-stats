var Docker = require('dockerode');
var docker = new Docker();

exports.getContainerStats = function(containerId) {

  return new Promise(function(success, failure) {

    console.log("Recieved request to get container stats for " + containerId);

    var container = docker.getContainer(containerId.id);

    console.log(containerId);

    container.stats(function(err, data) {

      console.log(data);

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
