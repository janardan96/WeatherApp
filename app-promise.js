const yargs=require("yargs");
const axios=require('axios');
const argv =yargs
.option({
    a:{
        describe:"Address to fetch weather for",
        demand:true,
        alias:"address",
        string:true
    }
})
.help()
.alias("help","h")
.argv;

var encodeAddresss=encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddresss}`;

axios.get(geocodeUrl).then((response)=>{
if(response.data.status==="ZERO_RESULTS"){
    throw new Error("Unable to find that address");
}
var lat=response.data.results[0].geometry.location.lat;
var lng=response.data.results[0].geometry.location.lng;
var weatherUrl=`https://api.darksky.net/forecast/1bfe67ef5885e02c7c32cb1d03b05212/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature=(response.data.currently.temperature-32)*(5/9);
    var apperntTemperature=response.data.currently.apparentTemperature;
    console.log(`It's currently temperature is ${temperature} and Its feel like ${apperntTemperature}`);
}).catch((e)=>{
    if (e.code="ENOTFOUND"){
        console.log("Unable to connect to api");
    }
});
