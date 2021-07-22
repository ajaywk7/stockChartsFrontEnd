import React, { useEffect } from "react";

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    // Update the document title using the browser API
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  const login = async (username, password) => {
    if (username === "user" && password === "user") {
      await setUser({
        username: "user",
        role: "user",
        accessToken: "xxx",
      });
    } else if (username === "admin" && password === "admin") {
      await setUser({
        username: "admin",
        role: "admin",
        accessToken: "xxx",
      });
    } else {
      return {
        message: "Authentication failed",
      };
    }
  };

  const register = async () => {};

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
