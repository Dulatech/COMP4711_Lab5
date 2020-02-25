var express = require('express');
const fs = require('fs')
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));
app.use(express.static(__dirname + '/public'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/loadartists', function(req, res) {
    var student = null;
    filePath = __dirname + '/artists.json';
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        student = JSON.parse(data);
        // console.log(student)
        res.json(student)
    });
});

app.post('/add', function(req, res) {
    var name = req.body;
    var element = JSON.parse(JSON.stringify(name));
    filePath = __dirname + '/artists.json';
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        let array = JSON.parse(data);
        element["id"]=array.length;
        array.push(element);
        // console.log(element);
        fs.writeFile(filePath, JSON.stringify(array), function(err) {
            if (err) { throw err }
            res.status(200).json({
                message: "File successfully written"
            });
        });
    });
});

app.post('/delete', function(req, res) {
    var name = req.body;
    var element = JSON.parse(JSON.stringify(name));
    // console.log(parseInt(element.indx));
    filePath = __dirname + '/artists.json';
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        let array = JSON.parse(data);
        array.splice(parseInt(element.indx), 1);
        for(let i = 0; i < array.length; i++){
            array[i].id = i;
        }
        // console.log(array)
        fs.writeFile(filePath, JSON.stringify(array), function(err) {
            if (err) { throw err }
            res.status(200).json({
                message: "File successfully written"
            });
        });
    });
});

app.post('/search', function(req, res) {
    var name = req.body;
    var element = JSON.parse(JSON.stringify(name));
    console.log(element.words);
    filePath = __dirname + '/artists.json';
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        let array = JSON.parse(data);
        let newArray = [];
        for(var i = 0; i < array.length; i++){
            if((array[i].name.toLowerCase().indexOf(element.words.trim().toLowerCase()) == -1) 
        && (array[i].about.toLowerCase().indexOf(element.words.trim().toLowerCase()) == -1)){
            
        } else{
            newArray.push(array[i]);
        }
        }
        console.log(newArray)
        res.json(newArray)
    });
});


app.listen(process.env.PORT || 8888, () => console.log('server listening on port 8888'));
