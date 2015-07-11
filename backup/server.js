var http = require("http");
var url = require("url");

function start(route, pages) {
  function onRequest(request, response) {
  	var postAll = "";
    var pathname = url.parse(request.url).pathname;
    if (pathname != "/favicon.ico") {
	    console.log("\nRequest for " + pathname + " received.");
		route(pages, pathname, response, request);
    }
  }

  var port = Number(process.env.PORT || 8888);
  http.createServer(onRequest).listen(port);
  console.log("Server has started.");
}

exports.start = start;