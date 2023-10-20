import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
// import "./app.css"
import Maps from "../src/pages/Maps";
import Login from "../src/pages/Login";
import Dashboard from "./pages/Dashboard";
import MapsGeo from "./pages/MapsGeo";
// import GeoJson from "./components/GeoJsonComponent/GeoJson";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Maps/>}/>
      <Route path="/admin" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/geo" element={<MapsGeo/>}/>
      {/* <Route path="/MapsGeo" element={<GeoJson/>}/> */}
    </Routes>
  );
}

export default App;
