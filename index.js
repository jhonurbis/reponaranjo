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
    
    var urlApi = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=174d1966288642ebb61162416181710&q=${city}&format=json&num_of_days=1`;
// let url = `http://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&APPID=apikey`;
    console.log("url-api"+urlApi);
    console.log(getTiempo());
    
    //Persist this in some database
    //Send out an email that new feedback has come in
    res.status(200).json({
       fulfillmentText: "la ciudad introducida es "+city,
        source: 'timpo Feedback System'});
    
    
    
    

    
    
});

function getTiempo(){
   var url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=174d1966288642ebb61162416181710&q=${city}&format=json&num_of_days=1`;
       request(url, function(error, response, body) {
        // Convertimos a JSON, la respuesta del servicio
        let _body = JSON.parse(body);
           console.log("hola"+_body);
    });

}
const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
