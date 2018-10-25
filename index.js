const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/version', (req, res) => {
    res.status(200).send("APIAI Webhook Integration. Version 1.0");
});

app.get('/', (req, res) => {
    res.status(200).send("Hello from APIAI Webhook Integration.");
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
    console.log(req.body);
    console.log(req.body.queryResult.parameters["geo-city"]);
    var city = req.body.queryResult.parameters["geo-city"];// json que envia dialogflow
	//var url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=174d1966288642ebb61162416181710&q=${city}&format=json&num_of_days=1`;

  	respuesta=getTiempo(city);
	console.log("url-api"+respuesta);
    
    
    
    //var urlApi = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=174d1966288642ebb61162416181710&q=${city}&format=json&num_of_days=1`;
      
    // let url = `http://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&APPID=apikey`;
   // console.log("url-api"+urlApi);
  
    
    //Persist this in some database
    //Send out an email that new feedback has come in
    res.status(200).json({
       fulfillmentText: "Temperatura Maxima en "+city + "sera de ",
        source: 'timpo Feedback System'});
    
    
});





var result;



  function cb (error, response, body) {
  let resJson = JSON.parse(body);
  let temperatura = resJson['data']['weather'][0]['maxtempC'];
	  result=temperatura;
      
  console.log('tempe', temperatura);
   console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
}


function getTiempo(ciudad){
	
	var url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=174d1966288642ebb61162416181710&q=${ciudad}&format=json&num_of_days=1`;
	result=request(url,cb);
	return result;
}


const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
