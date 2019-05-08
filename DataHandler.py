import tornado
import datetime
import json
import random
from time import gmtime, strftime
from GoogleAnalytics import getActiveUsers, createService

class DataHandler:

    def __init__(self, callback_time=30000, periods_stored=12):
        self.realtime_callback = tornado.ioloop.PeriodicCallback(
            callback=self.updateData, 
            callback_time=callback_time)

        self.ga_service = createService()

        self.periods_stored = periods_stored

        currentTime = datetime.datetime.now()
        currentTime = str(currentTime.hour) + "h:" + str(currentTime.minute) + "m"
        self.gccollab = [{"time": currentTime, "value": getActiveUsers(self.ga_service, "gccollab")}]
        self.gcconnex = [{"time": currentTime, "value": getActiveUsers(self.ga_service, "gcconnex")}]
        self.gcpedia = [{"time": currentTime, "value": getActiveUsers(self.ga_service, "gcpedia")}]

        self.realtime_callback.start()

    @tornado.gen.coroutine
    def updateData(self):
        currentUsers = yield self.getCurrentUsers()
        
        print(currentUsers)

        currentTime = datetime.datetime.now()
        currentTime = str(currentTime.hour) + "h:" + str(currentTime.minute) + "m"

        # Update gccollab value
        if len(self.gccollab) >= self.periods_stored:
            self.gccollab.pop(0)
            self.gccollab.append({"time": currentTime, "value": currentUsers["gccollab"]})
        else :
            self.gccollab.append({"time": currentTime, "value": currentUsers["gccollab"]})

        # Update gcconnex value
        if len(self.gcconnex) > self.periods_stored:
            self.gcconnex.pop(0)
            self.gcconnex.append({"time": currentTime, "value": currentUsers["gcconnex"]})
        else :
            self.gcconnex.append({"time": currentTime, "value": currentUsers["gcconnex"]})

        # Update gcpedia value
        if len(self.gcpedia) > self.periods_stored:
            self.gcpedia.pop(0)
            self.gcpedia.append({"time": currentTime, "value": currentUsers["gcpedia"]})
        else :
            self.gcpedia.append({"time": currentTime, "value": currentUsers["gcpedia"]})


    @tornado.gen.coroutine
    def getCurrentUsers(self):

        return {
            "gccollab": getActiveUsers(self.ga_service, "gccollab"),
            "gcconnex": getActiveUsers(self.ga_service, "gcconnex"),
            "gcpedia": getActiveUsers(self.ga_service, "gcpedia")
        }

    @tornado.gen.coroutine
    def getData(self):
        
        data = {
            "gccollab": self.gccollab,
            "gcconnex": self.gcconnex,
            "gcpedia": self.gcpedia
        }

        json_data = json.dumps(data)

        return json_data

