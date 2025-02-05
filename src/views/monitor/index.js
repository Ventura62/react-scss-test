import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row } from "reactstrap";
import { useLocation } from 'react-router-dom';

import Sidebar from "src/components/layout/sidebar";
import {ViewHeader, SectionHeaders} from "src/components/viewHeader";
import { DataCard, ListCard } from "src/components/cards";
import { warning, danger } from "src/utils/getDefinedStyles";
import { capitalize, secondsToDHMS, parsedDate } from "src/utils/others";

import MonitorLoader from "./loader";

import {
  getAllHealthMetrics,
  getAllProtocolsMetrics
} from "src/redux/actions";

const Monitor = () => {

  const dispatch = useDispatch();
  const monitorState = useSelector((state) => state.monitor);

  const [openSidebar, setOpenSidebar] = useState(true);
  const [healtMetrics, setHealthMetrics] = useState([]);
  const [protocols, setProtocols] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const [selectedMonitor, setSelectedMonitor] = useState(null);

  useEffect(() => {
    if(!monitorState.healthMetricsObtained){
      dispatch(getAllHealthMetrics("", ""));
    }
  },[monitorState.healthMetricsObtained])

  useEffect(() => {
    if(!monitorState.protocolsObtained){
      dispatch(getAllProtocolsMetrics("", ""));
    }
  },[monitorState.protocolsObtained])

  useEffect(() => {
    setHealthMetrics(monitorState.healthMetrics);
  },[monitorState.healthMetrics])

  useEffect(() => {
    setProtocols(monitorState.protocolsMetrics);
  },[monitorState.protocolsMetrics])

  useEffect(() => {
    if (healtMetrics.length > 0 && protocols.length > 0) {
      const protocolMap = new Map(protocols.map(obj => [obj.hostname, obj]));
      const mergedData = healtMetrics.map(obj1 => {
        const obj2 = protocolMap.get(obj1.hostname);
        return {
          hostname: obj1.hostname,
          clientId: obj1.clientId,
          healtMetrics: {
            metrics: obj1.metrics,
            timestamp: obj1.timestamp,
            ...obj1.data,
          },
          protocols: obj2
            ? {
                protocol: obj2.protocol,
                metrics: obj2.metrics,
                timestamp: obj2.timestamp,
                ...obj2.data,
              }
            : {},
        };
      });
      setMonitors(mergedData);
    }
  }, [healtMetrics, protocols]);

  const selectMonitor = (monitor) => {
    setSelectedMonitor(monitor)
  }

  if(!monitorState.healthMetricsObtained && !monitorState.protocolsObtained && monitors.length > 0){
    return(
      <MonitorLoader/>
    )
  }

  return(
    <>
      <Sidebar
        items={monitors}
        selectItem={selectMonitor}
        selectedItem={selectedMonitor}
        sidebarStatus={openSidebar}
        changeSidebarStatus={()=>setOpenSidebar((prevState) => !prevState)}/>
      <div className="main--section monitor--view">
        {selectedMonitor !== null?
          <>
            <Row className="custom--row">
              <ViewHeader
                title={`Monitor: ${selectedMonitor.hostname}`}/>
            </Row>
            <div className="custom--section">
              {Object.keys(selectedMonitor.protocols).length !== 0?
              <>
                <SectionHeaders 
                  title={capitalize(selectedMonitor.healtMetrics.metrics)}
                  timestamp={parsedDate(selectedMonitor.healtMetrics.timestamp)}/>
                <div className="custom--row">
                  <DataCard
                    title="CPU temperature (°C)"
                    mainData={`${selectedMonitor.healtMetrics.cpuTemperature}`}
                    footer=""/>
                  <DataCard
                    title="CPU utilization (%)"
                    mainData={`${selectedMonitor.healtMetrics.cpuUtilization}`}
                    footer=""/>
                  <DataCard
                    title="Device Uptime"
                    mainData={`${selectedMonitor.healtMetrics.deviceUptime}`}
                    footer=""/>
                </div>
                <div className="custom--row">
                  <DataCard
                    title="OS version"
                    mainData={`${selectedMonitor.healtMetrics.osVersion}`}
                    footer=""/>
                  <DataCard
                    title="PSU 1"
                    mainData={`${selectedMonitor.healtMetrics.psu1}`}
                    footer=""/>
                  <DataCard
                    title="PSU 2"
                    mainData={`${selectedMonitor.healtMetrics.psu2}`}
                    footer=""/>
                </div>
              </>:
              <>
                <SectionHeaders title={`No health metrics found`}/>
              </>}
            </div>
            <div className="custom--section">
              {Object.keys(selectedMonitor.protocols).length !== 0?
              <>
                <SectionHeaders 
                  title={capitalize(selectedMonitor.protocols?.metrics)}
                  timestamp={parsedDate(selectedMonitor.healtMetrics.timestamp)}/>
                <div className="custom--row">
                  <DataCard
                    title="Protocol"
                    mainData={`${selectedMonitor.protocols?.protocol}`}
                    footer=""/>
                  <DataCard
                    title="IP Address"
                    mainData={`${selectedMonitor.protocols?.neighbor}`}
                    footer=""/>
                </div>
                <div className="custom--row">
                  <DataCard
                    title="Description"
                    mainData={`${selectedMonitor.protocols?.neiDescription}`}
                    footer=""/>
                  <DataCard
                    title="State"
                    mainData={`${selectedMonitor.protocols?.peerState}`}
                    footer=""/>
                </div>
              </>:
              <>
                <SectionHeaders title={`No protocol found`}/>
              </>}
            </div>
          </>:
          <>
            <Row className="custom--row">
              <ViewHeader
                title={"No monitor selected"}/>
            </Row>
          </>
        }
      </div>
    </>
  )
}

export default Monitor