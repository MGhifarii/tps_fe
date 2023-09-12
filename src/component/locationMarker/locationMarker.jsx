import React from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";

const eventIcon = new Icon({
    iconUrl: require("../../icons/pin.png"),
    iconsize: [30, 30]
});

const locationMarker = (props) => {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(){
            map.locate()
        },
        mouseover(){
            map.locate()
        },
        drag(){
            map.locate()
        },
        zoom(){
            map.locate()
        },
        locationfound(e){
            setPosition(e.latlng)
        },
    })

    return position === null ? null : (
        <Marker position={position} icon={eventIcon}>
            <Popup>You Are Here</Popup>
        </Marker>
    )

}
