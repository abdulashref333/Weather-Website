const request = require('request');

const geocode = (address,callback) =>{
    let url = '';
    langDetect(address,(lang)=>{
        if(lang==='arabic'){
            url="https://api.mapbox.com/geocoding/v5/mapbox.places/+"+encodeURIComponent(address)+
            ".json?language=ar&access_token=pk.eyJ1IjoiYWJkdWxhc2hyZWYzMzMiLCJhIjoiY2tjZ2x3eHZvMHQ5ZTJ6cGJnZTJxYThnZCJ9.yJ69LtPHEaURRupIV2Ebrg";
        } else{
            url="https://api.mapbox.com/geocoding/v5/mapbox.places/+"+encodeURIComponent(address)+
            ".json?language=en&access_token=pk.eyJ1IjoiYWJkdWxhc2hyZWYzMzMiLCJhIjoiY2tjZ2x3eHZvMHQ5ZTJ6cGJnZTJxYThnZCJ9.yJ69LtPHEaURRupIV2Ebrg";
        }
    });
    
    request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('Unanble to connect to location services!',undefined);
        } else if(body.features.length===0){
            callback('Unable to find location . try another search!');
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            });
        }
    });
};
function langDetect(input,callback){
    const langdic = {
        "arabic" : /[\u0600-\u06FF]/,
        "english" : /^[a-zA-Z]+$/
    } 
    Object.entries(langdic).forEach(([key, value]) => { 
         // loop to read all the dictionary items if not true
        if (value.test(input) == true){
            return callback(key);
        }
    });
}

module.exports = geocode ;