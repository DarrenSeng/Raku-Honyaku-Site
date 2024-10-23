import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div style={{ backgroundColor: "#313131" }}>
      <NavBar />
      <Outlet /> {/* This is where child routes will be rendered */}
    </div>
  );
}

export default App;
