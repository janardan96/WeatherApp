const request=require("request");

var geocodeAddress=(address)=>{
    return new Promise((resolve,reject)=>{
        var encodeAddresss=encodeURIComponent(address);
        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddresss}`,
            json:true
        },(error,response,body)=>{
        if (error){
            reject("Unable to connect the google server");
        }
        else if(body.status==="ZERO_RESULTS"){
            reject("Unable to find the address");
        }
        else if(body.status==="OK"){
            resolve({
                Address:body.results[0].formatted_address,
                Latitute:body.results[0].geometry.location.lat,
                Longitute:body.results[0].geometry.location.lng
            });
        }
        });
    });
};

geocodeAddress("110086").then((location)=>{
console.log(JSON.stringify(location,undefined,2));
},(errorMessage)=>{
console.log(errorMessage);
});