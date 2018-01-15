$(document).ready(function(){
	
	$("#username").val("default");
	
	myonload();
	
	$( "form" ).submit(function( e ) {
		e.preventDefault();
		
		//add username as part of message for quickness
		var msg = "msg=" + $("#username").val()+ ": " + $("#textbox").val();
		$.post('/', msg, function(data){
			
			var strings = data.split(',');
			var mydata = '';
			$("#messages").html('');
			$("#textbox").val("");
			
			strings.forEach(function(e) {
				
				mydata = "<h2>"+ e + "</h2>";
				
				$("#messages").append(mydata);
			});
		});
		
		return false;
	});	
	
	//update every 5s
	window.setInterval(function(){
		var msg = "msg=update";
		$.post('/', msg, function(data){
			
			var strings = data.split(',');
			var mydata = '';
			$("#messages").html('');
			
			strings.forEach(function(e) {
				
				mydata = "<h2>"+ e + "</h2>";
				
				$("#messages").append(mydata);
			});
			});
	},5000);

	
});

function myonload(){
	var msg = "msg=update";
		$.post('/', msg, function(data){
			
			var strings = data.split(',');
			var mydata = '';
			$("#messages").html('');
			
			strings.forEach(function(e) {
				
				mydata = e + "<br>";
				
				$("#messages").append(mydata);
			});
		});
}