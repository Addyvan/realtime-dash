
class DataStore {
  constructor() {
    this.gccollab = [];
    this.gcconnex = [];
    this.gcpedia = [];
  }

  updateData(datastring) {
    var data = JSON.parse(datastring);

    this.gccollab = data.gccollab;
    this.gcconnex = data.gcconnex;
    this.gcpedia = data.gcpedia;
    
  }

  getGCcollab() {
    return this.gccollab;
  }

  getGCconnex() {
    return this.gcconnex;
  }

  getGCpedia() {
    return this.gcpedia;
  }
}

var datastore = new DataStore();