import React from "react";

import NavigationBar from "./navigation";

const Layout = ({children}) => {

  return(
    <div className="custom--layout">
      <div className="custom--container">
        <NavigationBar/>
        <div className="custom--view">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;