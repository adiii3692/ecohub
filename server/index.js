const express = require('express')
const cors = require('cors')
require('dotenv').config();
const routes = require('./routes.js')
const testConnection = require('./db.js')
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const app = express();

//Cors
app.use(cors());
//Bodyparser middleware
app.use(bodyParser.json({limit:'5mb'}));

app.listen(PORT,()=>{
    testConnection.testConnection();
    console.log('Listening to PORT '+PORT);
});

app.get('/',(request,response)=>{
    return response.send('App is working on PORT: '+PORT);
})

app.use('/',routes);

module.exports = app