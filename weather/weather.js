const request=require('request');

var getWeather=(lat,lng,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/1bfe67ef5885e02c7c32cb1d03b05212/${lat},${lng}`,
        json:true
    },(error,response,body)=>{
    if (!error && response.statusCode===200){
    callback(undefined,{
        Temperature:(body.currently.temperature-32)*(5/9),
        apparentTemperature:body.currently.apparentTemperature
    
    });
    }
    else{
        callback("Unable to connect the weather app");
    }
    
    }); 
};
module.exports.getWeather=getWeather