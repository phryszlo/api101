import { apiBaseUrl } from "./config.js";
import axios from 'axios';


export async function getLocations(zipCode, accessToken) {

    try {
        // Use stored access token for location request
        // let accessToken = getAccessToken();
        // console.log("accessToken pre-axios: " + accessToken);
        let url = `${apiBaseUrl}/v1/locations?filter.zipCode.near=${zipCode}`;

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

    } catch (err) {
        console.log(err);
    }

}

// https://api.kroger.com/v1/locations/{{LOCATION_ID}}
export async function getStore(locid, accessToken) {

    try {
        let url = `${apiBaseUrl}/v1/locations/${locid}`;

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

    } catch (err) {
        console.log(err);
    }

}

  // let res = await axios(config);
  // console.log(res.data.access_token);




// }