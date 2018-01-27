
var getContainerStatsDlg = require('./GetContainerStatsDelegate');
var getContainersDlg = require('./GetContainersDelegate');

exports.getDockerStats = function() {

  return new Promise(function(success, failure) {

    getContainersDlg.getContainers().then(function(containers) {

      if (containers == null || containers.length == 0) success({});

      var stats = [];

      for (var i = 0; i < containers.length; i++) {

        getContainerStatsDlg.getContainerStats(containers[i]).then(function(stats) {

          stats.push(stats);

          if (stats.length == containers.length) {
            success({containers: stats});
          }
        });
      }
    });
  });

}
