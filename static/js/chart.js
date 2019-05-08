class LineChart {
  constructor(canvas_id, color) {
    this.color = color;
    this.ctx = document.getElementById(canvas_id);
    this.chart = this.init(this.ctx);
    this.data = [];
  }

  init(ctx) {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{ 
            data: [],
            //label: "GCcollab",
            borderColor: this.color, //"#46246a",
            fill: false
          }
        ]
      },
      options: {
        hover: { mode: false } ,
        scales: {
          yAxes: [{
            ticks: {
              //beginAtZero: true,
              stepsize: 1
            }
          }]
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          //text: 'Users Online Currently'
        }
      }
    });
  }

  updateData(data) {
    this.data = data;
  }

  updateChart() {

    var labels = [];
    var values = [];
    for (var i = 0; i < this.data.length; i++) {
      labels.push(this.data[i].time);
      values.push(this.data[i].value);
    }

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = values;

    
    this.chart.update();
  }

  triggerAnimation() {
    this.chart.reset();
    this.chart = this.init(this.ctx);
  }

}

class BarChart {
  constructor(canvas_id, labels, values, title, color) {
    this.labels = labels;
    this.values = values;
    this.color = color;
    this.text = title;
    this.ctx = document.getElementById(canvas_id);
    this.chart = this.init(this.ctx);
    this.data = [];
  }

  init(ctx) {
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{ 
            data: this.values,
            label: "GCcollab Top Orgs",
            backgroundColor: this.color,
            fill: false
          }
        ]
      },
      options: {
        hover: { mode: false } ,
        scales: {
          yAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            }
          }],
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: this.text
        },
        layout: {
          padding: {
              left: 0,
              right: 0,
              top: 25,
              bottom: 0
          }
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
  }

  triggerAnimation() {
    this.chart.reset();
    this.chart = this.init(this.ctx);
  }

}

class TimeSeriesChart {
  constructor(canvas_id, labels, values, color) {
    this.labels = labels;
    this.values = values;
    this.color = color;
    this.ctx = document.getElementById(canvas_id);
    this.chart = this.init(this.ctx);
    this.data = [];
  }

  init(ctx) {
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{ 
            data: this.values,
            //label: "GCcollab",
            borderColor: this.color, //"#46246a",
            fill: false
          }
        ]
      },
      options: {
        hover: { mode: false } ,
        scales: {
          yAxes: [{
            ticks: {
              //beginAtZero: true,
              stepsize: 1
            }
          }]
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          //text: 'Users Online Currently'
        }
      }
    });
  }

  triggerAnimation() {
    this.chart.reset();
    this.chart = this.init(this.ctx);
  }

}

//var gcconnexChart = new LineChart("gcconnexChart", "#34a80a"); 
//var gcpediaChart = new LineChart("gcpediaChart", "#2f74e2");