import React from "react";

export const AuthContext = React.createContext({
    isAuthenticated: false,
    webToken: null,
    name: null,
    userSubscription: [],
    authenticate: (username, password) => {},
    signout: () => {}
})
