var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response, request) {
  	console.log("Request handler 'start' was called.");
  	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload">'+
    '<br>'+
    '<input type="submit" value="Upload File!" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files) {
		console.log("Parsing Done!");
		fs.rename(files.upload.path, "/tmp/test.png", function(err) {
			if (err) {
				fs.unlink("tmp/test.png");
				fs.rename(files.upload.path, "/tmp/test.png");
			}
			response.writeHead(200, {"Content-Type" : "text/html"});
			response.write("Image Uploaded!");
			response.write("<img src='/show'>");
			response.end();
		});
	});
}

function show(response) {
  	console.log("Request handler 'show' was called.");
  	fs.readFile("tmp/test.png", "binary", function(error, file) {
  		if (error) {
  			response.writeHead(500, {"Content-Type": "text/plain"});
      		response.write(error + "\n");
      		response.end();
  		}
  		else {
  			response.writeHead(200, {"Content-Type": "image/png"});
    		response.write(file, "binary");
    		response.end();
  		}
  	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;