import os
import tornado.ioloop
import tornado.web
from tornado.options import define, options, parse_command_line

from WebSocketServer import WebSocketHandler

define("port", default=8888, help="run on the given port", type=int)

# we gonna store clients in dictionary..
clients = dict()

class IndexHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(self):
        self.render("index.html")


app = tornado.web.Application([
        (r'/', IndexHandler),
        (r'/web', WebSocketHandler),
        (r'/js/(.*)', tornado.web.StaticFileHandler, {'path': './static/js'}),
        (r'/css/(.*)', tornado.web.StaticFileHandler, {'path': './static/css'}),
        (r'/images/(.*)', tornado.web.StaticFileHandler, {'path': './static/images'})
    ],
    template_path=os.path.join(os.path.dirname(__file__), "templates")
)

if __name__ == '__main__':
    parse_command_line()
    print("starting server on port: " + str(options.port))
    app.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()