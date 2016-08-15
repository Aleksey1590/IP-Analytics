//Import all necessary libraries and helpers
var BciWebSocket = require('./webSocket.js'); //import webSocket code
var StatisticsModule = require('./statisticsMethods.js');
var AddressHelpers = require('./addressHelper.js');
var geoIP = require('./geoIP_handler.js');

//Create necessary Prototype objects
var Stats = new StatisticsModule();
var helper = new AddressHelpers();

//An array where we will store all IP that came through our script
var ipCollection = 
	[
		{
	  		"Address": "127.0.0.1",
	  		"Frequency": 1,
	  		"Country": null
		}
	];



//Count number web socket incoming messages
var counter = 0;

//Start the script
function start() {
	var ws = new BciWebSocket();

	ws.registerCallback(function (ipAddress) {
		counter++;
		console.log(counter);
		if (ipAddress=="127.0.0.1"){
			//If BlockChain relayed TX
			countDuplicate(ipAddress, null);
		}
		//Get Country of origin of this IP address
		geoIP.fetchGeoIP(ipAddress, function (countryInfo, error) {
			
			if (error != null ){} //Catch any errors or unhandled data from geoIP API
			else {
				var country = countryInfo.country_name;
				
				//Call method to analyze this IP activity
				countDuplicate(ipAddress, country); 
				}
			}
			
		);

		//Every 50 request, show top 5 most active IP addresses
		if (counter%50==0){generateResults();}
		})


	};

//Count number of relays done by every single individual IP address
function countDuplicate(ipAddress, country){
	sortArray(ipCollection);
	for (var i = 0; i < ipCollection.length; i++){
		if (ipCollection[i].Address == ipAddress){
			helper.incrementAddress(ipAddress, ipCollection);
			return true;
			}
		}
	helper.createNewAddress(ipAddress, ipCollection, country);
}

//Produce TOP-5 IP addresses that generate abnormal amount of relaying
function generateResults(){

			sortArray(ipCollection);
			console.log("Counter : " + counter);
			var maxNorm = Stats.findMaxNormal(ipCollection);
			Stats.getAbnormalActivity(maxNorm, ipCollection);

}

//Sort an array in ascending order
function sortArray(array){
	array.sort(function (a, b) {
  				if (a.Frequency > b.Frequency) {return -1;}
  				if (a.Frequency < b.Frequency){return 1;}
  				return 0;}
  			);
}


start();

