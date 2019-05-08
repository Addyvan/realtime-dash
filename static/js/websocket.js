
if (window.location.href == "http://localhost:8888/") {
  var socket = new WebSocket('ws://localhost:8888/web');
} else {
  var socket = new WebSocket('wss://analytics.gccollab.ca/dash/web');
}

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {

  datastore.updateData(event.data);

  // Update the numbers
  document.getElementById("gccollabActiveUsers").innerHTML = datastore.gccollab[datastore.gccollab.length -1].value;
  //document.getElementById("gcconnexActiveUsers").innerHTML = datastore.gcconnex[datastore.gcconnex.length -1].value;
  //document.getElementById("gcpediaActiveUsers").innerHTML = datastore.gcpedia[datastore.gcpedia.length -1].value;

  // Update the charts
  gccollabActiveUsersChart.updateData(datastore.gccollab);
  gccollabActiveUsersChart.updateChart();

  //gcconnexChart.updateData(datastore.gcconnex);
  //gcconnexChart.updateChart();

  //gcpediaChart.updateData(datastore.gcpedia);
  //gcpediaChart.updateChart();

});

setInterval(function() {
  socket.send("please give data");
}, 5000)