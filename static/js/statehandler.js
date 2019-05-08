class DashboardState {
  constructor() {
    this.gccollab = {
      current: 0
    };
    this.gcconnex = {
      current: 0
    };
    this.gcpedia = {
      current: 0
    };
    this.rocketchat = {
      current: 0
    };

    this.init();
    this.start();
  }

  init() {
    this.gccollab["charts"] = [
      gccollabActiveUsersChart,
      gccollabTopOrgsChart,
      gccollabTopGroupsChart,
      gccollabUsersChart
    ]
    this.gccollab["cards"] = [
      document.getElementById("gccollabActiveUsersCard"),
      document.getElementById("gccollabTopOrgsCard"),
      document.getElementById("gccollabTopGroupsCard"),
      document.getElementById("gccollabUsersCard")
    ]
    this.rocketchat["charts"] = [
      rocketMessagesChart,
      rocketRoomsChart,
      rocketUsersChart,
      rocketFilesChart
    ]
    this.rocketchat["cards"] = [
      document.getElementById("rocketMessagesCard"),
      document.getElementById("rocketRoomsCard"),
      document.getElementById("rocketUsersCard"),
      document.getElementById("rocketFilesCard")
    ]
  }

  shiftGCcollab() {

    if (this.gccollab.current + 1 >= this.gccollab.charts.length) {
      this.gccollab.current = 0;
    } else {
      this.gccollab.current++;
    }

    for (var i = 0; i < this.gccollab.charts.length; i++) {
      if (i == this.gccollab.current) {
        this.gccollab.charts[i].chart.ctx.canvas.style.display = "block";
        this.gccollab.charts[i].triggerAnimation();
        this.gccollab.cards[i].className = "col-md-3 active-gccollab-card";
      } else {
        this.gccollab.charts[i].chart.ctx.canvas.style.display = "none";
        this.gccollab.cards[i].className = "col-md-3 gccollab-card ";
      }
    }

  }

  shiftRocket() {

    if (this.rocketchat.current + 1 >= this.rocketchat.charts.length) {
      this.rocketchat.current = 0;
    } else {
      this.rocketchat.current++;
    }

    for (var i = 0; i < this.rocketchat.charts.length; i++) {
      if (i == this.rocketchat.current) {
        this.rocketchat.charts[i].chart.ctx.canvas.style.display = "block";
        this.rocketchat.charts[i].triggerAnimation();
        this.rocketchat.cards[i].className = "col-md-3 active-rocket-card";
      } else {
        this.rocketchat.charts[i].chart.ctx.canvas.style.display = "none";
        this.rocketchat.cards[i].className = "col-md-3 rocket-card ";
      }
    }

  }

  start() {
    // GCcollab
    var self = this;
    self.set_collab = setInterval(function() {
      self.shiftGCcollab();
    }, 30000);

    self.set_rocket = setInterval(function() {
      self.shiftRocket();
    }, 40000);
  }
}

var dashState = new DashboardState();