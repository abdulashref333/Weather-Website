const requist = require('request');

const forcast = (lat,lon,lan,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0d4791dcf43c22919813062c20d791cb&query='+lat+','+lon;
    requist({url , json:true},(er,{body}={})=>{
        if(er){
            callback('Unable to find location weather!');
        } else if(body.error){
            callback('Please specify a valid location',undefined);
        } else{
            let data ={
                country:body.location.country,
                city:body.location.region,
                date:body.location.localtime,
                icon:body.current.weather_icons[0],
                description:body.current.weather_descriptions[0]
            };
            if(lan==="arabic"){
                data.temperature =  `الحرارة الان  ${body.current.temperature}  درجة`;
                data.feelslike =`  تبدو كأنها  ${body.current.feelslike}  درجة`;
            } else if(lan==='english'){
                data.temperature = "It's Currently "+body.current.temperature+" degrees out.";
                data.feelslike = "It feels like "+body.current.feelslike+" degrees.";
            }
            callback(undefined,data);
        }
    });
}
module.exports = forcast ;