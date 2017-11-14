const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');




// Get our API routes
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/employees_leave', (req, res) => {
    request("http://hitesh:3000/test_vega",function(err,response, responseHtml){
        console.log(JSON.parse(response.body));
        res.json(JSON.parse(response.body));
    })
});

app.get('/employees_info',function(req,res){
    scrapePage();
    res.json(arr);
})
app.get('/test',function(req,res){
    res.send('its working');
})
url = 'http://vega/portal/user/celeberation.action';

function scrapePage () {
    //make an HTTP request for the page to be scraped
    
    request({
        url : url ,
        headers : {
            "user-Agent" : 'request'
        }
    }, function(error, response, responseHtml){    
        arr = [];
         if (!error) {
            var $ = cheerio.load(responseHtml);
            $("table").parents('#alphaContainer').find('tr').each(function(index,item) {
                if(index>0)
                {
                   var tds = $(item).find('td').children('div').children('a').text();
                   tds = tds.trim();
                   arr.push(new processData(tds));
                   //console.log(tds);
                }
            });
        }else{
            console.log("error");
        }    
        
    }) ;
}

var arr = []
function processData(name){  
    this.content = name;
    this.name = name;
}

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => console.log(`API running on localhost:${port}`));

