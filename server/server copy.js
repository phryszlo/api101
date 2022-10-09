import { getAccessToken } from './get-access-token.js';
import { getLocations } from './get-locations.js';
import { getProducts } from './get-products.js';
import { getDiscounts } from './get-discounts.js';
// import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

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
    console.log(req.params.term);
    await retrieveProducts(req.params.term)
      .then(() => {
        console.log("apiResponse: ", apiResponse);
        if (apiResponse === []) {
          console.log("server.js: [] returned");
          res.send({});
          return;
        }
        console.log(apiResponse[0].items[0].price.regular);
        res.send(apiResponse);
      })
      .catch((err) => {
        console.log("retrieveProducts error: ", err);
      })
  } catch (err) {
    console.log(err);
  }
});

app.get("/locations/:zip", async (req, res) => {
  try {
    console.log(req.params.zip);
    await retrieveLocations(req.params.zip)
      .then(() => {
        console.log(apiResponse);
        res.send(apiResponse);
      })
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("the root!");
});
 
// 🔸🔸🔸🔸🔸
// this is an experimental endpoint: it only returns mock data (always the same, only one record)
app.get('/discounts/:locid', (req, res) => {
  try {
    console.log(`discount params: ${req.params.locid} `);
    retrieveDiscounts(req.params.locid)
      .then (() => {
        console.log(`GET discount response: ${apiResponse}`)
      })
  }
  catch (err) {
    console.log(`GET discounts err: ${err}`);
  }

})



let apiResponse;


const retrieveDiscounts = async (locid, prodid = 0) => {
  try {
    let discounts = {};
    await getAccessToken().then(async (token) => {
      console.log(`token: ${token}`);
      discounts = await getDiscounts(token, locid, prodid)
        .then(response => {
          apiResponse = response;
          return response;
        })
        .catch((err) => {
          console.log(`from retrieveDiscounts: ${err}`);
        });
    });
  }
  catch (err) {
    console.log(`retrieveDiscount err: ${err}`)
  }
}

async function retrieveProducts(term) {
  try {
    let prods;
    await getAccessToken().then((async (s) => {
      prods = await getProducts(term, s).then(
        (response) => {
          apiResponse = response;
          return response;
        }
      )
        .catch((err) => {
          console.log(`from retrieveProducts: ${err}`);
        });
    }));
  } catch (err) {
    console.log(err);
  }
}

async function retrieveLocations(zip) {
  try {
    let locs;
    await getAccessToken().then((async (s) => {
      locs = await getLocations(zip, s).then(
        (response) => {
          apiResponse = response;
          return response;
        }
      );
    }));
  } catch (err) {
    console.log(err);
  }
}




//"eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJncm9jaGVyaS02MzA5MzZhOTVjNjY4NjVjYmU1Njg3YzUzM2RjOTMzMjczNzEyNzUwODk3ODA1ODk0MjQiLCJleHAiOjE2NTE3Nzc0OTEsImlhdCI6MTY1MTc3NTY4NiwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiJlNTQ2MDRkOC02MTNlLTU1OWQtOGNkYS0yNGQ2NDhlZDgzM2QiLCJzY29wZSI6IiIsImF1dGhBdCI6MTY1MTc3NTY5MTIwNTI1OTgxNiwiYXpwIjoiZ3JvY2hlcmktNjMwOTM2YTk1YzY2ODY1Y2JlNTY4N2M1MzNkYzkzMzI3MzcxMjc1MDg5NzgwNTg5NDI0In0.xBLrXWEZOq3sAjnKbmZ66N3rnXTyt4xYo4-3wSbyIOH7UJFQF75iwNAwdg3wtw-WIDmmYpAM8ZoJsbzQikPvxNj7hyoRcSOAVS1ts5IO-wDkyWh51m0mmWaWXfpABHWcWoZbfZUNSYepBu64xrk8-trBfKIyFXI66oKSGV3gQ7--iG5HuB2KzFtmGlMZQknZMIJi9y6M0MrdzQxAznpzKiNKPJ9gTVK5tXgk1tJB0fhNBaMuWHiG2xc80R-COeMMZEKguvSeGLceALkiRbYYmtSbqAlk-TWq2zp_h4Eqt90oiYoYOZejHQMEUYesbHWyD2cZBaFbg9SZdBoWb9LZqg");


// start express server on port 4000
app.listen(process.env.PORT || 4000, '0.0.0.0', () => {
  console.log('server started on (allegedly) 4000 and 0.0.0.0');
});