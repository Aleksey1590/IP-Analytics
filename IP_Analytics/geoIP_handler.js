var request = require('request');

module.exports = {fetchGeoIP: fetchGeoIP}; 


//Send a request to "http://freegeoip.net" API to retrieve its response
// to an ip
//And get a callback
function fetchGeoIP (ip, callback){
		var sendReq = "http://freegeoip.net/json/".concat(ip);
		
		request(sendReq, handleGeoReply.bind(null, callback));
}

//Handle the reply we get from the API
function handleGeoReply(callback, error, response, body) {
		//Catching errors or bad replies from API
		if (error) {
			callback(null, error)
		} 
		// If reply is not faulty
		else if (response.statusCode == 200) {
			var geoReply = JSON.parse(body);
			var country = geoReply['country_name'];
			//Check if we failed to retrieve a country name
			if (country==null || country==undefined || country=="") {
				callback(null, "Country lookup failed");
			} 
			//If country successfully received
			else {
				callback(geoReply, null);
			}
	  	} 
	  	//You shouldnt be able to get here
	  	else {
	  		callback(null, "Something weird happened");
	  	}
}