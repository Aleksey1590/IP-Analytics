module.exports = helpers;

function helpers(){

}

helpers.prototype = {
	//If an address was already in our ipCollection, increment its Frequency parameter
	incrementAddress: function (ipAddress, ipCollection){
		var target = ipCollection.find(function(item){
			return item.Address === ipAddress;
		});

		//Increment by 1
		target.Frequency =target.Frequency+1; 
	}, 

	//If ipAddress is not found in ipCollection - we create a new record of it
	//ipAddress - New address we analyze
	createNewAddress: function (ipAddress, ipCollection, country){
		
		//Standartise a new record
		var newEntry = {
			"Address": ipAddress,
			"Frequency": 1, 
			"Country": country
		}
		
		//Push it to the ipCollection array
		ipCollection.push(newEntry);
		}
}

