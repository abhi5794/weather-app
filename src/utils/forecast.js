const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/bf31933b5241d229fc7db502452220b8/'+lat+','+long+'?units=si'
    request({url, json : true}, (error,{body})=>{
        if(error){
            callback('No internet')
        }
        else if(body.error){
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined,'It is currently ' + body.currently.temperature + ' degrees out. There is a '+body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast