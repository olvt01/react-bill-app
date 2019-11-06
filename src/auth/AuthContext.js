import React from "react";

export const AuthContext = React.createContext({
    isAuthenticated: false,
    webToken: null,
    name: null,
    authenticate: (username, password) => {},
    signout: () => {}
})
