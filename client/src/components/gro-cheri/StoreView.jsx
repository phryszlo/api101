import { Fragment } from 'react'
import './gro-style.css';
import Stack from 'react-bootstrap/Stack';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { nodeRoot } from "../config_react.js";


function StoreView({ passedStore, id }) {

  const [displayStore, setDisplayStore] = useState(null);
  let { locId } = useParams();

  // ♾️♾️♾️♾️♾️ run-once useEffect []
  useEffect(() => {
    if (!locId) {
      // this component will receive either an id (locId: param) or a passedStore. if it gets an id, the id takes precedent.
      // at time of writing, the only way to this "route" is with the id, 
      // but the default of currentStore (as passedStore) was added because it might be useful.
      setDisplayStore(passedStore);
    }
    else {
      console.log(`storeview: currstore: ${locId}`);
      const fetchStore = async () => {
        try {
          const response = await axios.get(`${nodeRoot}/store/${locId}`);
          setDisplayStore(response.data);

          console.log(`displayStore: ${JSON.stringify(response.data)}`)
        } catch (error) {
          console.log(`storeView: [] useEffect err: ${error}`);
        }
      }

      fetchStore();
    }

  }, [])

  const HoursTable = () => {
    return (
      <Fragment>
        {
          ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(day => {
            return (
              <tr className="hours-tr">
                <>
                  <td>{day}</td>
                  <td>{displayStore.hours[`${day}`].open}</td>
                  <td>{displayStore.hours[`${day}`].close}</td>
                  <td className="hours-checked-td">{
                    displayStore.hours[`${day}`].open === "true" ?
                      <input type="checkbox" checked disabled />
                      :
                      <input type="checkbox" disabled />
                  }
                  </td>
                </>
              </tr>
            )
          })}
      </Fragment>
    )
  }



  const StackList = () => {
    return (
      <Fragment>
        <Stack>
          <h4>{displayStore.chain}</h4>
          <Stack className="stack-row" direction="horizontal" gap={3}>
            <h5>{displayStore.name}</h5>
            <h5>{displayStore.address.zipCode}</h5>
          </Stack>
          <Stack className="stack-vert" gap={0}>
            <span>{displayStore.address.addressLine1}</span>
            <span>{displayStore.address.county}</span>
            <span>{displayStore.address.city}, {displayStore.address.state}</span>
          </Stack>
          <table className="hours-table">
            <thead className="hours-thead">
              <tr className="hours-tr">
                <th className="hours-th">day</th>
                <th className="hours-th">open</th>
                <th className="hours-th">close</th>
                <th className="hours-th">open 24 hours</th>
              </tr>
            </thead>
            <tbody className="hours-tbody">
              {displayStore.hours && <HoursTable />}
            </tbody>
          </table>
        </Stack>
      </Fragment>
    )
  }

  return (
    <div className="storeview-component">
      {displayStore
        ? <div className="storeview-display">
          {displayStore && <StackList />}
        </div>
        : <div className="no-store">no store received</div>
      }
    </div>
  )
}

export default StoreView