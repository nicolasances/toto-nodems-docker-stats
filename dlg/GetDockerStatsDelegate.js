
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

            success({overallStats: getOverallStats(stats), containers: stats, statsPerType: getStatsPerType(stats)});
          }

        });
      }
    });

    /**
     * Retrieves the statistics grouped by container type (Java MS, NodeJS MS, Other...)
     */
    var getStatsPerType = function(containers) {

      if (containers == null) return {};

      var types = [];

      for (var i = 0; i < containers.length; i++) {

        var containerName = containers[i].name;

        var type = 'Utility';
        if (containerName.indexOf('toto-ms-') == 0) type = 'Java';
        if (containerName.indexOf('toto-nodems-') == 0) type = 'NodeJS';

        var stats = getStatsForType(type, types);

        if (stats == null) {
          types.push({type: type, memoryConsumption: 0});

          stats = getStatsForType(type, types);
        }

        stats.memoryConsumption += containers[i].memory;

      }

      return types;
    }

    /**
     * Returns the statistics of the specified type, if any (null otherwise)
     */
    getStatsForType = function(type, types) {

      if (types == null || types.length == 0) return null;

      for (var i = 0; i < types.length; i++) {

        if (types[i].type == type) return types[i];
      }

      return null;
    }

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
        totalMemory : totalMemory / 1000000000,
        totalMemoryConsumption : totalMemoryConsumption / 1000000000
      };
    }
  });

}
