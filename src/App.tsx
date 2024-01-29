import NavBar from "@components/Navbar";

import "@services/App.css";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <NavBar />

      <Outlet />
    </>
  );
}
export default App;
