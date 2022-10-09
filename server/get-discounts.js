import { apiBaseUrl } from "./config.js";
import axios from 'axios';

export async function getDiscounts(accessToken, locid, prodid = 0) {

  let url = `${apiBaseUrl}/experimental/savings/v0/discounts?`;
  const locFilter = locid === 0 ? `filter.locationId=${locid}` : null;
  const prodFilter = prodid === 0 ? `&filter.productId=${prodid}` : null;
  locFilter && (url += locFilter);
  prodFilter && (url += prodFilter);

  // filter.productId=7495563456235&filter.locationId=98989898&filter.chainName=KROGER&page.size=1&page.offset=0",

  return axios.get(url, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${accessToken}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    }
  });
}
