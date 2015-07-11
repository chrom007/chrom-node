var server = require("./server");
var router = require("./router");
var controller = require("./controller");

var pages = {};
pages["/"] = controller.start;
pages["/start"] = controller.start;
pages["/upload"] = controller.upload;
pages["/show"] = controller.show;

server.start(router.route, pages);