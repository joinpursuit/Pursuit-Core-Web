var request = require('request');
const api_key = 'siIyo4w5mg0REENX76Sr57QTgkt3BWvY';

const GETRequest = (url, cb) => {

    request.get(url, (err, res, body) => {

        const json = JSON.parse(body);
        cb(json);

    }).on('response', response => {

    //    console.log(response)

        
    });

};

const getGif = (search, num = 1, cb) => {

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&limit=${num}`;

    GETRequest(url, data => {
        cb(data)
    });

};

module.exports = {
    getGif,
}