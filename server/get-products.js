import { apiBaseUrl } from "./config.js";
import axios from 'axios';



export async function getProducts(term, accessToken) {

  try {
    // Use stored access token for request
    // let accessToken = getAccessToken();
    // console.log("accessToken pre-axios: " + accessToken);
    let filterLimit = 50;
    let url = `${apiBaseUrl}/v1/products?filter.locationId=01400370&filter.term=${term}&filter.limit=${filterLimit}`;
    console.log(`url: ${url}`);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
      },
    })
      .then(
        (response) => response.data.data
      )
      .catch(function (error) {
        console.log(error.toJSON());
      });

  } catch (error) {
    console.log(error.toJSON());
  }


  //kroger tut example
  async function getProductses(term) {
    // Use access stored access token for product request
    let accessToken = authentication.getAccessToken();
    // Use stored locationId
    let locationId = localStorage.getItem("locationId");

    // Use locationId as filter (if) selected by user
    let searchByLocation = "";
    if (locationId) {
      searchByLocation = `filter.locationId=${locationId}&`;
    }
    // Building product URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/products)
    // Query String (?filter.locationId=${locationId}&filter.term=${term})
    let productsUrl = `${config.apiBaseUrl
      }/v1/products?${searchByLocation}filter.term=${term}&filter.limit=${filterLimit}`;

    // Product request body
    let productsResponse = await fetch(productsUrl, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });

    // Return json object
    return productsResponse.json();
  }

}