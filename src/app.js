const path = require('path');
const express = require('express'); 
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


// Setup handlebars engine and views locating
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Thanapat'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Thanapat'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        helptext:'this is help page',
        name:'Thanapat'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!'
        });
    }
    geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address,
            })
        });
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products:[] 
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'error 404',
        message:'Help article not found',
        name:'Thanapat'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'error 404',
        message:'Page not found',
        name:'Thanapat'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port);
}); 