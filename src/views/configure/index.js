import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row } from "reactstrap";
import { useLocation } from 'react-router-dom';

import { ViewHeader } from "src/components/viewHeader";
import { InterfaceConfiguration } from "src/components/cards";

import ConfigureLoader from "./loader";

import {
  getAllInterfaceMetrics
} from "src/redux/actions";

const Configure = () => {

  const dispatch = useDispatch();
  const configureState = useSelector((state) => state.configure);

  let title = useLocation().pathname.replace("/", "");
  title = title.charAt(0).toUpperCase() + title.slice(1);
  const headerButtons = [
    {
      label: "Export Data",
      action: () => { console.log("button 1 action") },
      design: "dark"
    },
    {
      label: "Client Settings",
      action: () => { console.log("button 2 action") },
      design: "ligth"
    }
  ]

  const [interfaces, setIntefaces] = useState([])

  useEffect(() => {
    if (!configureState.loadedFirstTime) {
      dispatch(getAllInterfaceMetrics("", ""));
    }
  }, [configureState.loadedFirstTime])

  useEffect(() => {
    setIntefaces(configureState.interfaces)
  }, [configureState.interfaces])

  if (!configureState.loadedFirstTime) {
    return (
      <ConfigureLoader />
    )
  }

  return (
    <>
      <div className="main--section configure--view">
        <Row className="custom--row">
          <ViewHeader title={title} buttons={headerButtons} />
        </Row>
        <div className="custom--section">
          <InterfaceConfiguration
            title="Interface Configuration"
            items={interfaces}
          />
        </div>
      </div>
    </>
  )
}

export default Configure