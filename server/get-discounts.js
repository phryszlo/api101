import { apiBaseUrl } from "./config.js";
import axios from 'axios';

export async function getDiscounts(accessToken, prodid = 0, locid = 0, chainName = '') {
  // at time of writing, all params are required, tho the api err return claims only one is required
  let url = `${apiBaseUrl}/experimental/savings/v0/discounts`;
  const prodFilter = (prodid !== 0) ? `filter.productId=${prodid}` : null;
  const locFilter = (locid !== 0) ? `filter.locationId=${locid}` : null;
  const chainFilter = (chainName !== '') ? `filter.chainName=${chainName}` : null;
  const pageFilter = `page.size=111&page.offset=1`
  url = `${url}?${prodFilter}&${locFilter}&${chainFilter}&${pageFilter}`
  // url = locFilter && prodFilter && chainFilter ?
  //   `${url}?${prodFilter}&${locFilter}&${chainFilter}`
  //   : prodFilter && locFilter ?
  //     `${url}?${prodFilter}&${locFilter}`
  //     : prodFilter && chainFilter ?
  //       `${url}?${prodFilter}&${chainFilter}`
  //       : `${url}?${locFilter}`

  // filter.productId=7495563456235&filter.locationId=98989898&filter.chainName=KROGER&page.size=1&page.offset=0",
  //https://api.kroger.com/experimental/savings/v0/discounts?filter.productId=0001111097139&filter.locationId=01400948&filter.chainName=KROGER&page.size=111&page.offset=1

  return axios.get(url, {
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
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
}
