const request = require('request')

const forecast = (latitude, longitude, callback) => {

    // Change with your own API key
    const apiKey = '6d66f6a41ba8a8a24da95f6023aa7ea4'

    const url = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
