var WebSocket = require('ws');

//Address of Blockchain.info Web Socket to all online TXs
var BCI_WS_ENDPOINT = "wss://ws.blockchain.info/inv";

module.exports = BciWebSocket;


// Creating a web socket connection
function BciWebSocket() {
	this.socket = new WebSocket(BCI_WS_ENDPOINT);
	this.socket.onopen = onOpen.bind(this);
	this.socket.onmessage = onMessage.bind(this);
	this.socket.onerror = onError.bind(this);
	this.socket.onclose = onClose.bind(this);
	this.callbacks = [];
}

//Prototyping and making sure that a same callback is not issued twice
BciWebSocket.prototype.registerCallback = function(cb) {
	if(!this.callbacks.includes(cb)) {
		this.callbacks.push(cb);
	}
}

//Send a message to web socket === Subscribe to all unconfirmed TXs
function onOpen(event) {
	this.socket.send('{"op": "unconfirmed_sub"}');
}

//Hanlde all incoming data and produce a callback with an IP address of a relaying node of a TX
function onMessage(event) {
			 
			var ipAddress = JSON.parse(event.data);
			var ip = ipAddress['x']['relayed_by'];

			for (var cb in this.callbacks) {
				try {
					this.callbacks[cb](ip);
				} catch (e) {
					console.log(e);
				}
			}
}

//Hanlde any errors
function onError(error){
	console.log("Error: " + error.message);
}

//Handle a closure of web socket connection 
function onClose(closeMessage){
	  if (closeMessage.wasClean) {
	    console.log('Connection closed successfully');
	  } 
	  else {
	    console.log('Connection abrupted'); // 
	  }
	  console.log('Event code: ' + closeMessage.code + ' ; Reason: ' + closeMessage.reason);
}

