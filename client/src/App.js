import './App.css';
import './style.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Home from './components/home/Home';
import GroCheri from './components/gro-cheri/GroCheri';
import StoreView from './components/gro-cheri/StoreView';
import Sidebar from './components/Sidebar';
import MovieThing from './components/movie-thing/MovieThing';



// ✖️✖️✖️✖️✖️✖️
function App() {
  const [show, setShow] = useState(false);
  const [locations, setLocations] = useState(["initial"]);

  const [zipSearch, setZipSearch] = useState("90210");
  const [currentStoreName, setCurrentStoreName] = useState('Ralphs Fresh Fare - Beverly Doheny');
  const [currentStoreId, setCurrentStoreId] = useState('70300724');
  const [currentStore, setCurrentStore] = useState(null);
  const [viewId, setViewId] = useState(null)

  const navigate = useNavigate();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ♾️♾️♾️♾️♾️♾️♾️ one-time effect
  useEffect(() => {
    setCurrentStoreName("Ralphs Fresh Fare - Beverly Doheny")
    setCurrentStoreId("70300724")
    console.log(`CSN a la app useeffect[]: ${currentStoreName.toString()}`)
  }, [])

  // ♾️♾️♾️♾️♾️♾️♾️ current store effect
  useEffect(() => {
    currentStore && console.log(`app.useEffect.currStore = ${JSON.stringify(currentStore)}`)
  }, [currentStore])


  // ♾️♾️♾️♾️♾️♾️♾️ viewId trigger. viewId is set by handleViewLinkClick, 
  // and this is here to prevent a console warning (because maybe it's trying to tell me something?)
  useEffect(() => {
    console.log(`useEff viewId: ${viewId && viewId}`);
    viewId
      ? navigate(`/store-view/${viewId}`)
      : currentStore && navigate("/store-view");
  }, [viewId])



  const setStoreFields = (locid, name) => {
    setCurrentStoreName(name);
    setCurrentStoreId(locid);
  }

  const setStore = (store) => {
    try {
      setCurrentStore(store);
    }
    catch (err) {
      console.log(`setStore err: ${err}`);
    }
  }




  // 🟢🟢🟢
  return (

    <Container fluid className="App app-container">

      <div className="app-content">
        <header className="main-header">
          {/* <h1 className="title">The API Special v.0.101</h1> */}
          <Button className="show-offcanvas-button" variant="secondary" onClick={handleShow}>
            <span className="burger material-icons">toc</span>
          </Button>
        </header>



        {/* 🤺🤺🤺🤺ROUTES🤺🤺🤺🤺🤺 */}

        <Routes>
          <Route index path='home' element={<Home />} />
          <Route path='gro-cheri' element={
            <GroCheri
              viewId={viewId}
              setViewId={setViewId}
              locations={locations}
              setLocations={setLocations}
              setStore={setStore}
              currentStore={currentStore}
              currentStoreName={currentStoreName}
              setStoreFields={setStoreFields}
              zipSearch={zipSearch}
              setZipSearch={setZipSearch} />
          } />

          <Route path='store-view' element={<StoreView passedStore={currentStore} />}>
          </Route>
          <Route path="store-view/:locId" element={<StoreView />} />

          <Route path='movie-thing' element={<MovieThing />} />
        </Routes>
      </div>

      <Sidebar handleClose={handleClose} show={show} />

    </Container >
  );
}


export default App;
