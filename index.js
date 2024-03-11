import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import axios from 'axios';


// const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// used to parse data from the client
app.use(bodyParser.urlencoded({ extended: true }));

// used to serve static files
app.use(express.static("public"));

// used to set the view engine to ejs and set the views directory to the views folder in the root directory of the project 
app.get('/', (req, res) => {
    res.render('index.ejs');
    });

const api_baseurl = 'https://api.blockchain.com/v3/exchange';
// const api_key = 'c348e132-2e6b-4972-b20c-0a6ac1f7a28f';

app.post('/convert', async (req, res) => {
    const {from, to} = req.body;
    let symbol = `${from}-${to}`;
    const result  = await axios.get(`${api_baseurl}/tickers/${symbol}`);
    console.log(result.data);
    res.render('index.ejs',{resultd: JSON.stringify(result.data)});
});


// used to check if the server is running
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    });