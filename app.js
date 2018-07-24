const yargs=require("yargs");
const geocode=require("./geocode/geocode");
const weather=require("./weather/weather");

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

console.log(argv.a);
geocode.geocodeAddress(argv.a,(errorMessage,results)=>{
    if (errorMessage){
        console.log(errorMessage);
    }
    else{
        console.log(results.Address);
        weather.getWeather(results.Latitute,results.Longitute,(errorMessage,weatherResults)=>{
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                  console.log(`It's currently temperature is ${weatherResults.Temperature} and Its feel like ${weatherResults.apparentTemperature}`);
            }
            });
    }
});

