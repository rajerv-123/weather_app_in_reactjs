import "./App.css";
import Dashboard from "./Components/dashboard/dashboard";
import Header from "./Components/headers/header";
import SearchWithCity from "./Components/searchWithCity/serachWithCity";

function App() {
  return (
    <div>
      <Header />
      <SearchWithCity />
      <Dashboard />
    </div>
  );
}

export default App;
