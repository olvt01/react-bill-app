import React from "react";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  webToken: null,
  userInfo: [],
  userSubscription: [],
  userBookmark: [],
  authenticate: (username, password) => {},
  signout: () => {},
})
