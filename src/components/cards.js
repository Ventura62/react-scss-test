import React from "react";

import {Badge} from 'reactstrap';
import { ToggleOff, ToggleOn } from "src/assets/svg";
import { secondary, success, danger } from "src/utils/getDefinedStyles";
import { parsedDate } from "src/utils/others";

const DataCard = ({title, mainData, footer}) => {

  return(
    <div className="data--card">
      <div className="card--header">
        <div>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="card--main">
        {mainData}
      </div>
      <div className="card--footer">
        {footer}
      </div>
    </div>
  )
}

const ListCard = ({title, items}) => {

  return(
    <div className="list--card">
      <div className="card--header">
        <div>
        <h3>{title}</h3>
        </div>
        <div>
          {}
        </div>
      </div>
      <div className="card--list">
        {items && items.length > 0 && items.map((item, i) => (
          <div key={i} className="list--items">
            <div>{item.icon}</div>
            <div>{item.name}</div>
            <div>
              <Badge color={secondary().key}>
              {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const InterfaceConfiguration = ({title, items}) => {
  return(
    <div className="interface--card">
      <div className="card--header">
        <div>
        <h3>{title}</h3>
        </div>
        <div>
          <button
            type="button"
            className="custom--button ligth--button">
            Add Interface
          </button>
        </div>
      </div>
      <div className="interface--list">
        {items && items.length > 0 && items.map((item, i) => (
          <div key={i} className="list--items">
            <div>
              <div className="item--title">
                {item.data.interfaceStatus?<ToggleOn color={success().value}/>:<ToggleOff color={danger().value}/>}
                <h5>
                  {`${item.interface}`}
                </h5>
                {item.timestamp !== undefined? <span>Last update: {parsedDate(item.timestamp)}</span>:<></>}
              </div>
              <div>
                <button
                  type="button"
                  className="custom--button ligth--button">
                  Edit
                </button>
                <button
                  type="button"
                  className="custom--button ligth--button">
                  Delete
                </button>
              </div>
            </div>
            <div>
              <div>
                <div>{`Inbound rate: ${item.data.inBitsRate} Mb/s`}</div>
                <div>{`Outbound rate: ${item.data.outBitsRate} Mb/s`}</div>
              </div>
              <div>
                <div>{`Inbound errors: ${item.data.inErrors}`}</div>
                <div>{`Outbound errors: ${item.data.outErrors}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { DataCard, ListCard, InterfaceConfiguration };