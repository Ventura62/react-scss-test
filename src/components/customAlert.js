import React from "react";

import { Alert } from "reactstrap";

const CustomAlert = ({color="primary", children}) =>{
  return(
    <Alert className="custom--alert" color={color}>
      {children}
    </Alert>
  )
}

export default CustomAlert;