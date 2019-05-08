function createContentChart(canvas_id) {
  var ctx = document.getElementById(canvas_id);
  var gcconnexContent = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Q1 2017", "Q2 2017", "Q3 2017", "Q4 2017", "Q1 2018", "Q1 2018", "Q1 2018", "Q1 2018"],
      datasets: [{ 
          data: [180717, 194338, 209519, 226406, 244620, 258288, 272158, 286870],
          label: "GCconnex Total content quarterly",
          backgroundColor: "#46246a",
          fill: false
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            //stepsize: 1
          }
        }],
      },
      legend: {
        display: false
      },
      title: {
        display: false,
        //text: 'Users Online Currently'
      },
      animation: {
        onComplete: function() {
          var chartInstance = this.chart;
          var ctx = chartInstance.ctx;

          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function(dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function(bar, index) {
              var data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
            });
          });
        }
      }
    }
  });
  return gcconnexContent;
}