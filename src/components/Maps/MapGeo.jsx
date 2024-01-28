// import './App.css';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Markers from '../Markers/Markers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Icon } from 'leaflet';
import style from "./map.module.css";
import SearchMarker from "../SearchMarker/SearchMarker";
import LocationMarker from "../LocationMarker/LocationMarker";
import GeoJson from '../GeoJson/GeoJson';


// const skater = new Icon({
//   iconUrl: require("../../icons/placeholder.png"),
//   iconSize: [25, 25]
// });

// function Map() {
//   var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();
//   return (
//     <div>
//     <MapContainer center={[-6.908775426573443, 107.64318087144039]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker icon ={skater} position={[-6.908775426573443, 107.64318087144039]}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//     </div>
//   );
// }

// export default Map;


const MapGeo = (props) => {
  console.log(props.data)
return (
    <div className={style.Map}>
    <MapContainer  className={style.leaflet_container} center={[-6.908775426573443, 107.64318087144039]} zoom={13} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <Markers data={props.data}/> */}
      {/* {props.search ? <SearchMarker data={props.dataSearch}/> : null}
        <LocationMarker 
        // myPosition={receivedPosition}
        /> */}
      <GeoJson data={props.data}/>
    </MapContainer>
    </div>
  );
}

export default MapGeo;