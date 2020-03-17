const path = require('path')
const express = require('express')
const hbs = require('hbs') // this is for using partials
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs') // to be added for hbs
app.set('views', viewPath) //for hbs views folder, since it is not in the default views folder
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'weather app',
        name: 'abhi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'abhi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'abhi'
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'You need to provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude} = {})=>{ //setting up a default value for the object so it won't crash
        if (error){
            return res.send({error}) //to stop the execution if it fails
        } 
        forecast(latitude,longitude , (error, forecastData)=>{
            if  (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                address : req.query.address
            })
    
        })
    })
})

app.get('*', (req,res)=>{
    res.send('404')
})


app.listen(port, ()=>{
    console.log('Running on '+port)
})