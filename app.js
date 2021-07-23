const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

// initiating the app
const app = express();


//use top level generic function of body parser
app.use(bodyParser.urlencoded({extended : false}));
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});


// handling the post request
app.post('/',function(req,res){

    var myCity = req.body.myCity;
    var temp;
    const option = {
        hostname: 'api.openweathermap.org',
        port: 443,
        path: '/data/2.5/weather?q='+ myCity +'&appid=f341905388adcf87b67251fb1f2dc6a4',
        method: 'GET'
    };
    const request = https.get(option,(response)=>{
        response.on('data',(resData)=>{
            const weatherData = JSON.parse(resData)
            temp = JSON.stringify(weatherData.main.temp)
            console.log(temp)
            res.write('<h1>Temperature of your city  ' + myCity + ' is :' + temp +'</h1>');
            res.end();
        })
    })
    request.end();

});

app.listen(process.env.PORT || 3000,function(){
    console.log('server started at @3000');
})
