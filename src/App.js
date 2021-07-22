import React from "react";
import "./App.css";
import { AuthContext } from "./context/AuthProvider";
import Homepage from "./pages/Homepage";
import Login from "./pages/login";

function App() {
  const { user } = React.useContext(AuthContext);
  return (
    <div>
      {user === null && <Login />}
      {user && <Homepage />}
    </div>
  );
}

export default App;
