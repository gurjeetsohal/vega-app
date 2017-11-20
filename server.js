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
app.use(express.static(path.join(__dirname,'dist')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('/employees_leave', (req, res) => {
//     request("http://hitesh:3000/test_vega",function(err,response, responseHtml){
//         console.log(JSON.parse(response.body));
//         res.json(JSON.parse(response.body));
//     })
// });



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

////////////////////////hitesh sir code


var check_html = true,
check_geeks_html = true;


app.get('/test_vega', function(req, res, next) {
    
        // here we will send response to our controller 
       // console.log("A Get Request Recieved for geksforgeeks");
    
    
        var name_hello;
        var base_url = 'http://vega/portal/messageboard/msg_get.action';
    
        var options = {
            url: 'http://vega/portal/messageboard/msg_get.action',
            headers: {
                'User-Agent': 'request'
            }
        };
    
        if (check_html) {
            request(options,
                function(error, response, html) {
    
    
                    if (!error) {
                        check_geeks_html = false;
                        geeks_html = html;
                        process_geeksforgeeks(res);
                    }
                });
        } else {
            process_geeksforgeeks(res);
        }
    
    
    
    });
    
    function processUserData(html) {
        var $ = cheerio.load(html);
                //console.log("-------------------------------");
       //console.log($('.field').text());
    }
    
    var process_geeksforgeeks = function(res) {
        var $ = cheerio.load(geeks_html);
    
        function randomInt(low, high) {
            return Math.floor(Math.random() * (high - low) + low);
        }
        var low = 0,
        random_quote = 0,
            high;
    
        // exec(cmd, function(error, stdout, stderr) {
        //     // command output is in stdout]
        //     console.log(stdout);
        // });
       // console.log("-----------------------");
    
        // quote_json.src = base_url + $('.zoomc')[random_quote].attribs.src;
        // quote_json.text = $('.zoomc')[random_quote].attribs.alt;
    
        var sample_array = [];
        $('.msgTable').each(function() {
            // To get to particular table // Late arrivals and leave messages
           // console.log("-------------------------------");
            var current_scope = $(this); //Setting scope to a particular variable 
            var array_of_nodes = current_scope.find('.blueText > span'); // Finding all the span nodes in that particular node
    
    
            sample_array = [];
            var single_element = single();
    
    
            for (var i = 0; i < array_of_nodes.length; i++) {
                single_element.id = i;
    
    
                var dummy_data = array_of_nodes[i].firstChild.data;
                var re = new RegExp(/([0-9]+\.)/);
                if (!dummy_data.match(re)) {
                    if (dummy_data.indexOf("From") > -1) {
    
                        dummy_data = dummy_data.replace("From ", "");
                        var parts = dummy_data.split("/");
                        single_element.start = new Date(parts[2], parts[1] - 1, parts[0]);
    
                    } else if (dummy_data.indexOf("To") > -1) {
    
                        dummy_data = dummy_data.replace("To ", "");
                        var parts = dummy_data.split("/");
                        single_element.end = new Date(parts[2], parts[1] - 1, parts[0]);
    
                    } else
                    if (dummy_data.indexOf("on ") > -1) {
                        dummy_data = dummy_data.replace("on ", "");
                        var parts = dummy_data.split("/");
                        single_element.start = new Date(parts[2], parts[1] - 1, parts[0]);
    
                    } else if (dummy_data.indexOf("today") > -1) {
                        var date = new Date();
                        single_element.start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        //console.log(single_element.start);
                    } else if (dummy_data.indexOf("will not come") > -1) {
                        //console.log(dummy_data);
                    } else {
    
                        single_element.content = dummy_data;
    
                    }
    
                } else {
                    sample_array.push(single_element);
                    single_element = single();
                }
    
            }
    
        });
        // SENDING JSON
        res.json(sample_array);
    }
    
    function single() {
        return {
            'id': '',
            'content': '',
            'start': '',
            'end': ''
        };
        //for /L %N in (1,1,254) do @nslookup 192.168.2.%N 
    };

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4000';
app.set('port', port);

app.listen(port, () => console.log(`API running on localhost:${port}`));

