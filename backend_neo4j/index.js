const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(routes);
app.use(function(err, req, res, next){ //error handling middleware
    res.status(422).send({error: err.message});
}); 

// listen for requests
const PORT = process.env.port || 3001;
app.listen(PORT, function(){
    console.log("Now listening for request port: "+PORT);
});