var express = require('express');
var path = require('path');
var app = express();
var rootpath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');
var fs = require('fs');

//statc function serves the files with out processing them

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(rootpath + '/app'));

//  app.get('/data/event/:id', events.get);
//  app.post('/data/event/:id', events.save);


app.listen(8000);

/** Write some code to 
 * authenticate and authorize
 */


/** Then based on the code above
 * I will write the api to check and answer the request
 */
// --> my imaginery code here for authentication!!

/** Create a router object or instance to store a certain route calls */
var router = express.Router();
/** set the base path to '/api' to create a subset for the routes */
app.use('/api', router);
app.use(express.static(rootpath + '/app'));

/** This resource is to test if the api is working
 * to call this resource the url would be -> '/api/ping/' with a 'GET' verb
 */
router.get('/ping/:filename', function (req, res, next) {
    fs.readFile('./app/data/event/' + req.params.filename + '.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

    /** console logging to verify that the api is working
     * you can use postman to verify something like http://localhost:8000/api/karthik
     * and simulating a get call to recieve the json object '{"foo":"bar"}'
     */
    //console.log('Request recieved!');
    /** Here you can use node modules to process anything
     * FOr example, if you want to read a file sitting in the server, you
     * can use the 'readfile' method from 'fs' module
     * If a certain module is not installed then install it using the npm install command
     * and then use the 'require("modulename") syntax to grab it to a variable
     * and work with it.
     */
    /** create a dummy json object */
    // var obj = {
    //     'foo': 'bar'
    // }

    // /** return it on the response */
    // res.json(obj);



router.post('/ping/:fileName', function (req, res, next) {
    var event = req.body;
    console.log(req.body);
    var msg = "success on post";
    fs.writeFile('./app/data/event/' + req.params.fileName + '.json',  JSON.stringify(event, null,2));
    res.send(msg);
});



console.log("listening on port 8000");
