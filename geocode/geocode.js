console.log("geo code");
const request=require('request');

var geocodeAddress=(address,callback)=>{
    var encodeAddresss=encodeURIComponent(address);
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddresss}`,
        json:true
    },(error,response,body)=>{
    if (error){
        callback("Unable to connect the google server");
    }
    else if(body.status==="ZERO_RESULTS"){
        callback("Unable to find the address");
    }
    else if(body.status==="OK"){
        callback(undefined,{
            Address:body.results[0].formatted_address,
            Latitute:body.results[0].geometry.location.lat,
            Longitute:body.results[0].geometry.location.lng
        });
    }
    });
}

module.exports.geocodeAddress=geocodeAddress;

// 1bfe67ef5885e02c7c32cb1d03b05212