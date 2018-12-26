//Kevin Zheng
//Lab - 1

const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Routes: </h1><br><h3>Math/add?</h3><br><h3>Math/multiply?</h3><br><h3>gif/search?</h3>');
})
app.get('/math/add', (req, res) => {
    let sum = 0
    let sumString = '';
    const {
        query
    } = req;
    // const myKeys = Object.keys(query);
    const myValue = Object.values(query);
    for (let i = 0; i < myValue.length; i++) {
        if (isNaN(myValue[i])) {
            res.json({
                'err': 'You passed a non-number value into the parameters.'
            })
            return;
        } else {
            sum += (parseInt(myValue[i]))
            if (i != myValue.length - 1) {
                sumString += myValue[i] + ' + ';
            } else {
                sumString += myValue[i];
            }
        }
    }
    res.json({
        input: query,
        sumString: sumString,
        sum: sum,
    });
});
app.get('/math/multiply', (req, res) => {
    let prod = 1
    let prodString = '';
    const {
        query
    } = req;
    // const myKeys = Object.keys(query);
    const myValue = Object.values(query);
    for (let i = 0; i < myValue.length; i++) {
        if (isNaN(myValue[i])) {
            res.json({
                'err': 'You passed a non-number value into the parameters.'
            })
            return;
        } else {
            prod *= (parseInt(myValue[i]))
            if (i != myValue.length - 1) {
                prodString += myValue[i] + ' * ';
            } else {
                prodString += myValue[i];
            }
        }
    }
    res.json({
        input: query,
        productString: prodString,
        product: prod,
    });
});

app.get('/gif/', (req, res) => {
    const {
        query
    } = req;
    const api_key = 'siIyo4w5mg0REENX76Sr57QTgkt3BWvY';
    const gifArray = [];
    request.get({
        url: `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query.search}`,
    }, function (err, httpResponse, body) {
        const data = JSON.parse(body);
        for (let i = 0; i < data.data.length; i++) {
            let url = data.data[i].url
            gifArray.push(url);
        }
        res.json({
            gifArray,
        });
    })
})


app.listen(port, () => {
    console.log(`listening at port ${port}`)
});