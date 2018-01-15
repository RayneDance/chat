// HTTP server core

//Include necessary files.
const http = require('http');

url = require('url');
fs = require('fs');
globals = require('./config');
chat = require('./chatmodule');

// Create HTTP server
const server = http.createServer(function(req, res) {
	

	
	if(url.parse(req.url).pathname == "/favicon.ico"){
		res.writeHead(204, {'Content-Type': 'text/html'});
		res.end();
		return;
	}
	
	chat.build(req, res);

	res.writeHead(200, {'Content-Type': 'text/html'});
	
});

server.listen(globals.port, globals.hostname, () =>{
	console.log(`Server running on ${globals.hostname}:${globals.port}`)
});