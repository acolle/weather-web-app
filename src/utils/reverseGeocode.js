const request = require('request')

const geocode = (latitude, longitude, callback) => {

    // Change with your own API key
    const apiKey = 'pk.eyJ1IjoiYWNvbGxlIiwiYSI6ImNqdXgza2JveDA0N240NHBpMzBsZ3Zlam8ifQ.qx3VvuP23SrGvod1dAL3Hw'

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + longitude + ',' + latitude + '.json?access_token=' + apiKey + '&limit=1'

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].context[1].text + ', ' + body.features[0].context[2].text
            })
        }
    })
}

module.exports = geocode
