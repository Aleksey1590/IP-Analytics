module.exports = Statistics;

//A collection of methods to produce a Statistical analysis of incoming data

function Statistics(){}

Statistics.prototype = {
	constructor: Statistics,

	// Find the ceiling of Normal data.
	// All ip Addresses that exceed this value - are treated as outliers, because 
	// their frequency is above weighted average
	findMaxNormal: function (someArray){
		var array = someArray.concat();
	    var values = [];

	    for (var i=0; i< array.length; i++){
	    	values[i] = array[i].Frequency;
	    }

	    values.sort( function(a, b) {
	            return a - b;
	         });

	    var q1 = values[Math.floor((values.length / 4))];
	    var q3 = values[Math.ceil((values.length * (3 / 4)))];
	    var iqr = q3 - q1;

	    var maxValue = q3 + iqr*1.5;

	    return maxValue;
		}, 

	// Find all IP addresses that are outliers. 
	getAbnormalActivity: function (maxNormal, SitRep){

		var currentPopIP = SitRep;
		var abnormalActivity = [];

		currentPopIP.sort(function(a, b){return a - b;});

		for (let i = 0; i<currentPopIP.length; i++){
			if (currentPopIP[i].Frequency > maxNormal){
				abnormalActivity = abnormalActivity.concat(currentPopIP[i]);
			}
		}

		abnormalActivity.sort(function (a, b) {
	  				if (a.Frequency > b.Frequency) {return -1;}
	  				if (a.Frequency < b.Frequency){return 1;}
	  				return 0;}
	  			);

		//Produce a report of top 5 outlying IP addresses.

		// Expect these 2 addresses to be in the lead
		// 1. 127.0.0.1 - Blockchain.info
		// 2. 82.197.211.136 - Netherlands - http://www.yabtcn.info/
		for (let j = 0; j < 5; j++){
			if (abnormalActivity[j] === undefined){}
			else {
				console.log("");
				console.log("Address: " + abnormalActivity[j].Address);
				console.log("Frequency: " + abnormalActivity[j].Frequency);
				console.log("Country: " + abnormalActivity[j].Country);
				console.log("");
			}
		}
	}


}