import React from 'react'
import style from "./map.module.css";
import { MapContainer, TileLayer} from "react-leaflet";
import Markers from "../Markers/Markers";
import SearchMarker from "../SearchMarker/SearchMarker";
// import Routing from "../Routing/Routing";
import LocationMarker from "../locationMarker/locationMarker";
import GeoJsonComponent from "../GeoJsonComponent/GeoJsonComponent";

const Map = (props) => {
    return(
        <div className={Style.map}>
            <MapContainer
            className={style.lealet_container}
            center={(-6.908775426573443, 107.64318087144039)}
            zoom={13}
            scrollWheelZoom={true} 
            zoomControl={false}
            >
            <TitleLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker data={props.data}
            />
            {props.search ? <SearchMarker data={props.dataSearch}/> : null}
            <GeoJsonComponent data={props.data} category={props.category}/>
            </MapContainer>
        </div>
    )
}

export default Map