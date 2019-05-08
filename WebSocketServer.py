import tornado.websocket

from DataHandler import DataHandler

class WebSocketHandler(tornado.websocket.WebSocketHandler):

    datahandler = DataHandler(callback_time=20000)

    @tornado.gen.coroutine
    def open(self, *args):
        self.stream.set_nodelay(True)

    @tornado.gen.coroutine
    def on_message(self, message):
        data = yield self.datahandler.getData()
        self.write_message(data)
    
    @tornado.gen.coroutine
    def on_close(self):
        print("closing")