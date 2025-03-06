const express = require('express')
import cors from 'cors';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();
import routes from './routes.js';
import { testConnection } from './db.js';

const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const app = express();

//Cors
app.use(cors());
//Bodyparser middleware
app.use(bodyParser.json({limit:'5mb'}));

app.listen(PORT,()=>{
    testConnection();
    console.log('Listening to PORT '+PORT);
});

app.get('/',(request,response)=>{
    return response.send('App is working on PORT: '+PORT);
})

app.use('/',routes);

module.exports = app