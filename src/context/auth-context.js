import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: null,
  user: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = function ({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // const userIsLoggedIn = !!token;
  const userIsLoggedIn = !!user;

  const loginHandler = function (user) {
    // setToken(token);
    setUser(user);
  };

  const logoutHandler = function () {
    // setToken(null);
    setUser(null);
  };

  const value = {
    token: token,
    user: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
