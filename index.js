var request = require('request');
var epress = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var path = require("path");
var server = require('http').createServer(app);
var io = require('socket.io')(server);


/* Handling all messenges */
app.post('/webhook', function (req, res) => {
    console.log('rcibiii');
    res.setHeader('content-type', 'application/json');
    var city = req.body.queryResult.parameters['geo-city'];
	let response = "holaaa";
	let responseObj = {
					"fulfillmentText":response,
					 "fulfillmentMessages": [
        {
            "text": {
                "text": [
                    "fulfillmentMessages text attribute"
                ]
            }
        }
    ],		"source":""
	
			
					
				}
		  
		  return res.json(responseObj);
})
