import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = function ({ children }) {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = function (token, email) {
    setToken(token);
  };

  const logoutHandler = function () {
    setToken(null);
  };

  const value = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
