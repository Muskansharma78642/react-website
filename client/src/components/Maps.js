import React, { useEffect, useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import Loader from './Loader';
import Marker from './Marker';

const markerStyle = {
  position: 'absolute',
  top:'100%',
  left:'50%',
  transform:'translate(-50%, -100%)'
};

const Maps =() => {
    const [coords, setCoords] = useState({ lat: null, lng: null })
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState()
    var center = { lat:22.71 , lng:75.88 }
    // var center = coords
    const zoom = 15
    var res;

    const renderMarkers = ( map, maps ) => {
      let marker = new maps.Marker({
        position:{ lat: coords.lat, lng: coords.lng }, map, title:'This is you'
      });
      return marker;
    }

    const getUserLocation = async (lat, lng) => {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=d18570683a1b4e13aad5c8d1808693a9`)
      res = await response.json()
      let results = res.results
      console.log(res.results)

      results.map((item) => {
        console.log(item.formatted)
        setInput(item.formatted)
        setLoading(false)
      })
    }

    const locateMe = () => {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(function(position) {
      setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
      console.log(coords)

      getUserLocation(position.coords.latitude, position.coords.longitude)

      // console.log(position.coords.latitude, position.coords.longitude)
      });
    }

    useEffect(() => {}, [coords, input])

    return(
      <div style={{ height: '100vh', width: '100%' }}>
        <input value={input} readOnly={true} style={{ height: 50, width: 700, margin: 10 }}></input>
        <button onClick={() => locateMe()} className='btn'>Locate Me!</button>
        { loading ? <Loader /> : null}

        <GoogleMapReact 
          bootstrapURLKeys={{ key: 'AIzaSyAspm8ajnLJxi6dyNG2oNadEkTegv0AU50' }} 
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        > 
        <Marker lat={coords.lat} lng={coords.lng} tooltip={'This is You'}/>
        </GoogleMapReact>
      </div>
    );
}

export default Maps;

