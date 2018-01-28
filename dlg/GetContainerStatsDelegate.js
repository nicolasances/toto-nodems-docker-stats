var Docker = require('dockerode');
var docker = new Docker();

exports.getContainerStats = function(containerId) {

  return new Promise(function(success, failure) {

    var container = docker.getContainer(containerId.id);

    container.stats({stream: false}, function(err, data) {

      success({
        containerId: containerId.id,
        type: getType([data.name]),
        name: data.name.substring(1),
        memory: data.memory_stats.usage
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
