import { useState, useEffect, useRef, Fragment } from 'react'
import BSButton from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack.js';


import MUIButton from '@mui/material/Button';
import { TextField } from "@mui/material";
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/system';

import axios from 'axios';
import { nodeRoot } from "../config_react.js";
import AutoTable from './AutoTable.jsx';

import './gro-style.css'

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
      zipcolor: '#526387'
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});


// 🔘🔘🔘🔘🔘🔘🔘🔘🔘🔘
function GroCheri({ viewId, setViewId, locations, setLocations, setStore, currentStore, currentStoreName, setStoreFields, zipSearch, setZipSearch }) {

  const [searchText, setSearchText] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  // const [viewId, setViewId] = useState(null)


  const btn = useRef(0);
  const txt = useRef(0);

  let currentStoreZip;


  // 🔸🔸🔸🔸🔸 locations triggered useEffect
  useEffect(() => {
    try {

      console.log(`gro-useeffect-loc setStore=${setStore.toString()}`);
      // console.log(`(useeffect)locations: ${JSON.stringify(locations)}`);
      console.log(`currentStoreName: ${typeof (currentStoreName)}`);
    }
    catch (err) {
      console.log(`gro-useEffect-locs: ${err}`);
    }
  }, [locations])

  // 🔸🔸🔸🔸🔸 currentStore triggered useEffect
  useEffect(() => {
    currentStoreZip && (currentStoreZip = currentStore.address.zipCode);
  }, [currentStore])




  // 🚥🕳️♾️💠🔘▫️▪️🔷🔲
  async function fetchLocations(e) {
    // e.preventDefault();
    console.log("hi");
    try {
      setLastSearch(zipSearch);
      const response = await axios.get(`${nodeRoot}/locations/${zipSearch}`);
      setLocations(response.data)
      const foo = Object.keys(response.data[0]);
      console.log(`object: ${JSON.stringify(foo)}`);
      // setLinkFields([])
    }
    catch (err) {
      console.log(`OnClick err: ${err}`);
    }
  }


  // 🔹🔹🔹🔹🔹 the FETCH button click handler (call fetchLocations)
  const handleSubmit = e => {
    try {
      e.preventDefault();
      if (zipSearch.length === 5) fetchLocations(e);
    } catch (error) {
      console.log(`handleSubmit err: ${error}`)
    }
  };


  // 🔹🔹🔹🔹🔹 update the state as you type the zip code
  const handleKeychange = e => {
    const re = /^[0-9\b]+$/;
    try {
      if ((e.target.value === '' || re.test(e.target.value)) &&
        searchText.length < 6) {
        setSearchText(e.target.value);
        setZipSearch(e.target.value);
      }

      if (e.keyCode === 13) {
        console.log(`searchText: ${searchText}`);

        btn.current.click();
        btn.current.active = true;
      }
    } catch (error) {
      console.log(`kandlekeychange err: ${error}`);
    }
  };


  // 🔹🔹🔹🔹🔹 set currentStore
  const handleIdLinkClick = (e) => {
    console.log(`idlink: ${e.target.dataset.storeId}`)
    console.log(`HILK locs: ${JSON.stringify(locations.filter((loc) => loc.locationId === e.target.dataset.storeId))}`);
    try {
      setStoreFields(e.target.dataset.storeId, e.target.dataset.storeName);
      locations &&
        setStore(locations.filter((loc) => {
          return loc.locationId === e.target.dataset.storeId
        })[0]);
    }
    catch (err) {
      console.log(`handleIdLink err: ${err}`);
    }
  }

  // 🔹🔹🔹🔹🔹 redirect to StoreView
  const handleViewLinkClick = (locid = null) => {
    console.log(`HVLC locid=${locid}`);
    try {
      // set viewid to trigger useEffect, which handles the navigate (so the console stops complaining)
      locid && setViewId(locid); //viewId is not the id of the currentStore <<<
      console.log(`handleviewlinkclick locid/viewid: ${locid && locid}/${viewId && viewId}`)

    } catch (error) {
      console.log(`handleviewlinkclick err: ${error}`)
    }
  }


  // 💠💠💠💠💠 MUI STYLED
  const StyledTextField = styled(TextField)({
    maxLength: 5,
    "& .MuiInputBase-root": {
      color: theme.palette.text.zipcolor
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.zipcolor
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.text.zipcolor

      }
    },
  });


  // ♾️♾️♾️♾️♾️♾️♾️ STACKS RENDERER
  const Stacks = () => {
    if (locations[0] === "initial") {
      console.log("nothing yet");

      return (<h4 style={{
        textAlign: "center",
        width: "100%",
      }}> </h4>);
    }
    else if (locations.length > 0) {
      console.log(`else if: ${locations}`)
      return (
        locations.map((location) => (
          <Fragment>
            <Stack className="stack-row" direction="horizontal" gap={3}>
              <div className="set-view-buttons">
                <BSButton
                  variant="warning"
                  data-store-id={location.locationId}
                  data-store-name={location.name}
                  onClick={handleIdLinkClick}
                  className="set-loc-anchor">
                  set
                </BSButton>
                <BSButton
                  variant="warning"
                  data-store-id={location.locationId}
                  data-store-name={location.name}
                  onClick={() => handleViewLinkClick(location.locationId)}
                  className="set-loc-anchor">
                  view
                </BSButton>
              </div>
              <span>{location.chain}</span>
              <span>{location.name}</span>
              <span>{location.address.addressLine1}</span>
            </Stack>

          </Fragment>
        ))
      )
    }
    else {
      return (
        <h4 style={{
          color: 'orangered'
        }}>No data for that zip code.</h4>
      )
    }
  }

  // ♾️♾️♾️♾️♾️♾️♾️ TABLE RENDERER
  const Table = () => {
    if (locations[0] === "initial") {
      console.log("nothing yet");

      return (<h4 style={{
        textAlign: "center",
        width: "100%",
      }}> </h4>);
    }
    else if (locations.length > 0) {
      return (
        <table className="locations-table" style={{ textAlign: "left", padding: "15px" }}>
          <thead>
            <tr key="0">
              <th key="1"></th>
              <th key="2">chain</th>
              <th key="3">name</th>
              <th key="4">address</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(data => (
              <tr className="loc-row" key={data.locationId + "r"}>
                <td key={data.locationId + "0"} style={{ width: '0px' }}>
                  <div className="set-view-buttons">

                    <BSButton
                      variant="warning"
                      data-store-id={data.locationId}
                      data-store-name={data.name}
                      onClick={handleIdLinkClick}
                      className="set-loc-anchor">
                      set
                    </BSButton>
                    <BSButton
                      variant="warning"
                      data-store-id={data.locationId}
                      data-store-name={data.name}
                      onClick={() => handleViewLinkClick(data.locationId)}
                      className="set-loc-anchor">
                      view
                    </BSButton>
                  </div>
                </td>
                <td key={data.locationId + "1"}>{data.chain}</td>
                <td key={data.locationId + "2"}>{data.name}</td>
                <td key={data.locationId + "3"}>{data.address.addressLine1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    else {
      return (
        <h4 style={{
          color: 'orangered'
        }}>No data for that zip code.</h4>
      )
    }
  }



  // 🟢
  return (
    <div className="component-container">
      <div className="gro-title-div">
        <h6 className="current-store-display">
          <span className="current-store-label">current store:</span>
          {currentStore ?
            `${currentStore.name} - ${currentStore.address.zipCode}`
            : 'none'
          }
        </h6>
        <h2 className="title">Gro-cheri<span>&#174;</span></h2>
      </div>
      {/* <h3 className="subtitle">What can we afford to buy this month?</h3> */}
      <Form>
        <Form.Group className="form-row mb-3" controlId="formBasicEmail">
          {/* <Form.Control type="number" placeholder="Enter zip code" /> */}
          <StyledTextField
            id="locationSearchZipCode"
            inputProps={{ maxLength: 5 }}
            value={zipSearch}
            type="tel"
            label="5-digit zip"
            size="small"
            variant="outlined"
            sx={{ color: 'text.primary' }}
            pattern="[0-9]*"
            ref={txt}
            placeholder="zip code"
            onChange={handleKeychange}
            autoFocus />
          <MUIButton
            id="btn-zip"
            type="submit"
            className="btn-zip"
            ref={btn}
            onClick={handleSubmit}
            variant="outlined">
            Fetch
          </MUIButton>
        </Form.Group>
      </Form>

      {locations ?
        <Fragment>
          <Table />
          {/* <Stacks /> */}
        </Fragment>
        : ''}

    </div>
  )
}

export default GroCheri