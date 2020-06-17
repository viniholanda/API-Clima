const express = require('express')
const app = express();
const port = 3000;
const https = require('https');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){

    
    const query = req.body.cityName;
    const apiKey = "798e8b87749dd36f1315d8c6012812ec"
    
    //API do site do tempo
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric"

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


            res.write("<p>The wether is currently " + weatherDescription + "<p>")

            res.write("<h1> The temperature in " + query + " is " + temp + " degrees celcius </h1>")

            res.write("<img src=" + imageUrl + ">")

            res.send()

        })

    })


})




app.listen(port, () => console.log(`Example app listening on port port!`))

console.log('Server running at http://127.0.0.1:8081/');