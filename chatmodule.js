//chat module

var mysql = require('mysql');
var qs = require('querystring');

var chat = {
	startup : true,
	cache10lines : new Array(10),
	webpage : new String(),
	pageobjects : new Array(),
	output : new String(),
	
	build: function (request, res){
		
		//console.log(request.connection.remoteAddress);
		
		if(this.startup){
			//
			console.log("First run");
			
			this.cache10lines = ['x', 'x', 'x',
								 'x', 'x', 'x',
								 'x', 'x', 'x'];
			
			this.webpage = chat.fetchpage();
			
			this.output = this.webpage;
			
			this.startup = false;
		}
		
		
		if(request.method == 'GET'){
			console.log(request.url);
			
			if(request.url.includes('.')){
				if(!request.url.includes('index')){
					chat.fetchpageobject(request.url);
				}
					
			}else{
				chat.output = chat.webpage;
			}
			
			res.end(chat.output);
		}
		
		if(request.method == 'POST'){
			var body = ''
			request.on('data', function(data) {
				body += data;
				
				// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
				if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
				}
			});
			
			request.on('end', function () {
				var post = qs.parse(body);
				
				if(post.msg != "update"){
					//post.msg = request.connection.remoteAddress+ ": " + post.msg;
					
					//strip open/close for tags
					post.msg.replace("<", "&lt;");
					post.msg.replace(">", "&gt;");
					
					//remove oldest message and add newest
					chat.cache10lines.shift();
					chat.cache10lines.push(post.msg);
					}
					
				chat.output = chat.cachedmessages();
				res.end(chat.output);
			});
			

		}
		
	},
	
	cachedmessages: function(){
		var ctstr = chat.cache10lines.join();
		
		return ctstr;
		
	},
	
	fetchpage: function(){
		
		var page = fs.readFileSync('./index.html', 'UTF-8');
		
		return page;
		
	},
	
	
	//fetches pages requested in main html document.
	fetchpageobject: function(furl){
		
		var trimmedurl = furl.slice(1);
		
		if(chat.pageobjects[trimmedurl] === undefined){
			console.log("Undef trig: "+trimmedurl);				
				var file;
				try {
					file = fs.readFileSync(trimmedurl, "UTF-8");
				}
				catch(e){
					console.log("Nope" + e);
					file =  "Error loading file";
				}
				
				chat.output = chat.pageobjects[trimmedurl] = file;


		}
		
		chat.output = chat.pageobjects[trimmedurl];
		return;

		
		
	}



}

module.exports = chat;

