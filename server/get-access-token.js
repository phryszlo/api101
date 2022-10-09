import axios from "axios";
import { oauth2BaseUrl, x64combo } from "./config.js";


let token = "";
const url =
  `${oauth2BaseUrl}/token?grant_type=client_credentials`;


//https://api.kroger.com/v1/connect/oauth2/authorize?scope={{SCOPE}}&response_type=code&client_id={{CLIENT_ID}}&redirect_uri={{REDIRECT_URI}}
//REACT_APP_OAUTH2_BASE_URL=https://api.kroger.com/v1/connect/oauth2
export async function getAccessToken() {
  try {
    let token = "";
    const url =
      `${oauth2BaseUrl}/token?grant_type=client_credentials&scope=product.compact`;
    console.log("url=" + url);

    const config = {
      method: 'post',
      url: url,
      data: 'nothing',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': `Basic ${x64combo}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
      },
    }

    let res = await axios(config);
    // console.log(res.data.access_token);
    return res.data.access_token;
  } catch (err) {
    console.log(err);
  }
}

export async function testFetch() {
  // getAccessToken();
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${x64combo}`
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        token = data.access_token;
      });
    console.log(`(fetch)token: ${token}`);
    return token;
  } catch (err) {
    console.log(err);
  }
}