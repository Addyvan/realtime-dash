function createGCcollabTopOrgs(canvas_id) {
  var topOrgLabels = [];
  var topOrgCounts = [];

  for (var i = 0; i < 10; i++) {
    topOrgLabels.push(topOrgs[i].org);
    topOrgCounts.push(topOrgs[i].count)
  }

  var gccollabTopOrgs = new BarChart(canvas_id, topOrgLabels, topOrgCounts, "Top Organizations by User Count", "#46246a");

  return gccollabTopOrgs;
}

function createGCcollabTopGroups(canvas_id) {
  var topGroupLabels = [];
  var topGroupCounts = [];

  for (var i = 0; i < 10; i++) {
    topGroupLabels.push(topGroups[i].name.substr(0,5));
    topGroupCounts.push(topGroups[i].count);
  }

  var gccollabTopGroups = new BarChart(canvas_id, topGroupLabels, topGroupCounts, "Top Groups by Member Count", "#46246a");

  return gccollabTopGroups;
}

function createGCcollabUsers(canvas_id) {
  var len = collabUsersDailyLabels.length;

  return new TimeSeriesChart(canvas_id, collabUsersDailyLabels.slice(len - 31, len -1), collabUsersDailyValues.slice(len - 31, len -1), "#46246a");
}

var gccollabActiveUsersChart = new LineChart("gccollabActiveUsersChart", "#46246a");
var gccollabTopOrgsChart = createGCcollabTopOrgs("gccollabTopOrgsChart");
var gccollabTopGroupsChart = createGCcollabTopGroups("gccollabTopGroupsChart");
var gccollabUsersChart = createGCcollabUsers("gccollabUsersChart");