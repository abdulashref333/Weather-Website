const requist = require('request');

const forcast = (lat,lon,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0d4791dcf43c22919813062c20d791cb&query='+lat+','+lon;
    requist({url , json:true},(er,{body}={})=>{
        if(er){
            callback('Unable to find location weather!');
        } else if(body.error){
            callback('Please specify a valid location',undefined);
        } else{
            callback(undefined,{
                country:body.location.country,
                city:body.location.region,
                date:body.location.localtime,
                temperature:body.current.temperature,
                icon:body.current.weather_icons[0],
                description:body.current.weather_descriptions[0]
            });
        }
    });
}
module.exports = forcast ;