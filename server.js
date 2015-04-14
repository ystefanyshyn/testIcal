
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var fs = require('fs');
	
var sendIcal = function(request, response) {
	var rs = fs.createReadStream('./'+request.params.id+'.ics');

	response.writeHead(200, {
		'content-type':'application/download',
		'content-disposition': 'attachment; filename=listing.ics'
	});

	rs.on('data',function (chunk) {
		response.write(chunk);
	});

	rs.on('error', function() {
		response.end('500');
	})
	rs.on('end', function () {
		response.end();
	});

}

//app.get('/:id', sendIcal);
app.get('/*', function(req, res) {
console.log(1);
	res.send('Yo');
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
