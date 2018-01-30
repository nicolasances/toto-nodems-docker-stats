
var getContainerStatsDlg = require('./GetContainerStatsDelegate');
var getContainersDlg = require('./GetContainersDelegate');

exports.getDockerStats = function() {

  return new Promise(function(success, failure) {

    getContainersDlg.getContainers().then(function(containers) {

      if (containers == null || containers.length == 0) success({});

      var stats = [];

      for (var i = 0; i < containers.length; i++) {

        getContainerStatsDlg.getContainerStats(containers[i]).then(function(dockerStats) {

          stats.push(dockerStats);

          if (stats.length == containers.length) {

            success({overallStats: getOverallStats(stats), containers: stats});
          }

        });
      }
    });
  });

  /**
   * Calculates the overall stats, like total memory, total memory consumption, etc..
   */
  var getOverallStats = function(containers) {

    if (containers == null) return {};

    var totalMemory = 0;
    var totalMemoryConsumption = 0;

    for (var i = 0; i < containers.length; i++) {

      totalMemory = containers[i].memoryLimit;
      totalMemoryConsumption += containers[i].memory;
    }

    return {
      totalMemory : totalMemory / 1000000,
      totalMemoryConsumption : totalMemoryConsumption / 1000000
    };
  }

}
