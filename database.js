var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.get('/getpolicy', function (req, res) {

    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'VMGoldUser',
        password: '$MASHnjC205#',
        server: 'WMPROD', 
        database: 'WM00022', 
        synchronize: true,
        trustServerCertificate: true,
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select  PoliKey, PoliNumb from UXPolicy', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});