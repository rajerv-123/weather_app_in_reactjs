import { useState } from "react";
import "./App.css";
import Dashboard from "./Components/dashboard/dashboard";
import Header from "./Components/headers/header";
import SearchWithCity from "./Components/searchWithCity/serachWithCity";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  return (
    <div>
      <Header />
      <SearchWithCity setLatitude={setLatitude} setLongitude={setLongitude} />
      <Dashboard latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default App;
