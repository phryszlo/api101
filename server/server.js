import { getAccessToken } from './get-access-token.js';
import { getLocations, getStore } from './get-locations.js';
import { getProducts } from './get-products.js';
import { getDiscounts } from './get-discounts.js';
// import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

let apiResponse;

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

app.use(bodyParser.json());

// add middlewares (serve react build)
// const root = require('path').join(__dirname, 'build');
// app.use(express.static(root));

// app.use('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.all('/*', function (req, res, next) {
  // CORS headers
  try {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, save-path, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, X-Access-Token, X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }
  catch (err) {
    console.log(err);
  }
});

app.get("/products/:term", async (req, res) => {
  try {
    const token = await getAccessToken();
    const products = await getProducts(req.params.term);
    apiResponse = products;
    console.log(apiResponse);
    res.send(apiResponse);
  } catch (err) {
    console.log(err);
  }
});

app.get("/locations/:zip", async (req, res) => {
  try {
    const token = await getAccessToken();
    const locs = await getLocations(req.params.zip, token);
    apiResponse = locs;
    console.log(apiResponse);
    res.send(apiResponse);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("the root!");
});

app.get("/store/:locid", async (req, res) => {
  try {
    const token = await getAccessToken();
    const store = await getStore(req.params.locid, token);
    apiResponse = store;
    console.log(apiResponse);
    res.send(apiResponse);
  } catch (err) {
    console.log(err);
  }
});


app.get("/", (req, res) => {
  res.send("the root!");
});


// this is an experimental endpoint: it only returns mock data (always the same, only one record)
// https://api.kroger.com/experimental/savings/v0/discounts?filter.productId=0001111097139&filter.locationId=01400948&filter.chainName=KROGER&page.size=111&page.offset=1
// FUTURE: probably add a chainName param, and/or other routes for diff num params.
app.get('/discounts/:prodid/:locid', async (req, res) => {
  try {
    const token = await getAccessToken();
    const discounts = await getDiscounts(token, req.params.prodid, req.params.locid, 'KROGER');
    apiResponse = discounts;
    console.log(apiResponse);
    res.send(apiResponse);
  }
  catch (err) {
    console.log(`GET discounts err: ${err}`);
  }
})

app.listen(process.env.PORT || 4000, '0.0.0.0', () => {
  console.log('server started on (allegedly) 4000 and 0.0.0.0');
});