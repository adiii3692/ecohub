import express from 'express';
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
const allowedOrigins = ['https://bug-free-trout-6qw6wwq9x79cxgx-5173.app.github.dev'];
const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false,  // Preflight request should end without further processing
    optionsSuccessStatus: 204 // Status code for successful preflight response
  };
app.use(cors(corsOptions));
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
