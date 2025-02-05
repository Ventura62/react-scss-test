import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row } from "reactstrap";

import CustomTable from "src/components/customTable";

import { warning, danger } from "src/utils/getDefinedStyles";
import { healtMetricsColumns, protocolMetricsColumns } from "src/utils/tablesSetUp";

import MonitorLoader from "./loader";

import {
  getAllHealthMetrics,
  getAllProtocolsMetrics
} from "src/redux/actions";

import {
  Database,
  Server,
  Cloud,
  TriangleExclamation,
  CircleExclamation
} from "src/assets/svg";

const MonitorAtl = () => {

  const dispatch = useDispatch();
  const monitorState = useSelector((state) => state.monitor);

  const [healtMetrics, setHealthMetrics] = useState([]);
  const [protocols, setProtocols] = useState([]);
  const [protocolsNames, setProtocolsNames] = useState([]);

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
    if (monitorState.healthMetrics?.length) {
      const transformedData = monitorState.healthMetrics.map(({ data, clientId, metrics, timestamp, ...rest }) => ({
        ...rest,
        ...(data || {}),
      }));
      setHealthMetrics(transformedData);
    }
  }, [monitorState.healthMetrics]);

  useEffect(() => {
    if (monitorState.protocolsMetrics?.length) {
      const transformedData = monitorState.protocolsMetrics.map(({ data, clientId, metrics, timestamp, ...rest }) => ({
        ...rest,
        ...(data || {})
      }));
      setProtocols(transformedData);
    }
  },[monitorState.protocolsMetrics])

  if(!monitorState.healthMetricsObtained && !monitorState.protocolsObtained){
    return(
      <MonitorLoader/>
    )
  }

  return(
    <>
      <div className="main--section configure--view">
        <Row className="custom--row">
          <CustomTable
            filters={healtMetricsColumns()}
            data={healtMetrics}
            loading={monitorState.loading}
            hasActions={false}
          />
        </Row>
        <Row className="custom--row">
          <CustomTable
            filters={protocolMetricsColumns()}
            data={protocols}
            loading={monitorState.loading}
            hasActions={false}
          />
        </Row>
      </div>
    </>
  )
}

export default MonitorAtl;