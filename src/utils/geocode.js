const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFpbDRhYmhpaml0aGt1bWFyIiwiYSI6ImNrNzljb2pqYTBwYWIzbXBmMmJvY2F1ZHMifQ.HXyyZW7s0OUEG3A5m82tHw&limit=1'
    //encodeURIcomponent() will make sure that a valid URL is passed to the request
    request({url:url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('unable to connect',undefined)
        }else if (body.features.length===0){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    })
}

module.exports = geocode