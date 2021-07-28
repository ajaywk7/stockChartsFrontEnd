import React, { useEffect } from "react";
import { authlogin, authregister } from "../api/authApi";

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);

  useEffect(async () => {
    // Update the document title using the browser API
    console.log(user);
    if (user) {
      await localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  const login = async (username, password) => {
    var data = {
      username: username,
      password: password,
    };
    //console.log(data);
    var response = await authlogin(data);
    console.log(response);
    console.log(response);

    if (response.error === false) {
      var user = {
        username: username,
        role: username === "admin" ? "admin" : "user",
        token: response.message.jwttoken,
      };
      await localStorage.setItem("user", JSON.stringify(user));
      await setUser(user);
    } else {
      return {
        message: "Authentication failed",
      };
    }
  };

  const register = async (username, password, se, ss) => {
    var data = {
      username: username,
      password: password,
    };
    //console.log(data);
    var response = await authregister(data);
    console.log(response);
    if (response.error === false) {
      await ss(true);
      await se(false);
    } else {
      await se(true);
      await ss(false);
    }
  };

  const logout = async () => {
    localStorage.setItem("user", null);
    setUser(null);
    console.log("clicked");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
