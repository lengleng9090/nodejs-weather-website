const request = require('postman-request');

const forecase = (lat,long,callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=f8f748567fc2f6c2068b320662ec40a0&query='+lat+','+long+'&units=m';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }
        else if(body.error){
            callback('Unable to find location.',undefined);
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+', It is currently '+body.current.temperature+' degress out. There is a '+body.current.precip+'% change of rain.');
        }
    })
}
module.exports = forecase;