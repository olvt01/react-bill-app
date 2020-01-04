import React from "react";

export const CssContext = React.createContext({
  width: '50px',
  collapsed: true,
  popUpSeen: false,
  toggleSideBar: () => {},
  togglePop: () => {}
})
