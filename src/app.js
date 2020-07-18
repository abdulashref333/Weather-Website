const hbs = require('hbs');
const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname,'../public');
const viewsDirectory = path.join(__dirname,'../templetes/views');
const partialsPath = path.join(__dirname,'../templetes/partials');

app.set('view engine','hbs');
app.set('views',viewsDirectory);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get('/',(req,res)=>{
    res.render('index',{
        name:'Abdul-Rahman Ashraf',
        title:'Weather'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Abdul-Rahman Ashraf',
        title:'About'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'How we could help?',
        title:'Help',
        name:'Abdul-Rahman Ashraf',
        paragraph:'this me abdulrahaman i could help you at any time please tell me what you want to do?'
    })
})
app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error:"Pleaze select the location"
        });
    }
    geocode(address,(error,{latitude, longitude, location,lan}={})=>{
        if(error){
           return res.send({
               error
           });
        }
        forcast(latitude,longitude,lan,(error,data)=>{
            if(error){
               return res.send({
                    error
                });
            }
            res.send({
                data,
                location
            });

        });
    })
})

app.get('/help/*',(req,res)=>{
    res.render('pageNot',{
        title:'Help Articl'
    })
})
app.get('*',(req,res)=>{
    res.render('pageNot',{
        title:'Page'
    });
});

app.listen(port,()=>{console.log('Server is up on port '+ port)});