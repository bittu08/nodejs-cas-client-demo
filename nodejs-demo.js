var http = require("http");
var CAS = require('cas');
var cas = new CAS({
    base_url: 'https://iamdev.hmadev.com', 
    version: 2.0
});

http.createServer(function (req, res) 
{
	exports.cas_login(req, res, function(user)
	{
		if(req.url=='/logout')
		{
			exports.cas_logout(req, res)
		}
	    res.end("Hello World");
	});
	
}).listen(1337, '127.0.0.1');

exports.cas_login = function(req, res, casCallback) 
  {
      cas.authenticate(req, res, function(err, status, user) {
        if (err) 
        {
        	console.log("Error"+err);
        } 
        else{
        	casCallback(user);
        }
      });
      }

exports.cas_logout = function(req, res) 
{
	cas.logout(req, res, undefined, true);
}
