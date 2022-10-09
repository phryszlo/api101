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

    // let locationResponse = await fetch(url, {
    //   method: "GET",
    //   mode: "cors",
    //   cache: "no-cache",
    //   headers: {
    //     "Authorization": `Bearer ${accessToken}`,
    //     "Content-Type": "application/json; charset=utf-8",
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    //   }
    // }).then(response => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
    // // Return JSON object
    // return locationResponse;
}

  // let res = await axios(config);
  // console.log(res.data.access_token);




// }