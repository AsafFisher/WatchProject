var http = require('http');
var gpio = require("gpio");


function checkStatus() {
    var options = {
        host: 'fisherline.org',
        port: '3000',
        path: '/getstatus',
        method: 'POST',
        data: {}
    };
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var obj = JSON.parse(chunk)
            var gpio16 = gpio.export(2, {
	            direction: 'out',
	            ready: function() {
		            gpio16.set(obj.success);
		            console.log("ping");
	            }
});
            console.log('BODY: ' + obj.success);
        });
    });
    req.write('');
    req.end();
}
setInterval(checkStatus, 0.5*1000);

