import React from "react";

const ViewHeader = ({title="", subTitle, buttons}) => {
  return(
    <div className="view--header">
      <div className="header--info">
        <h1>{title}</h1>
        {subTitle !== undefined ? <span>{subTitle}</span>:<></>}
      </div>
      <div className="header--buttons">
        {(buttons && buttons.length > 0 && buttons.map((button, i) => (
          <button key={i}
            type="button"
            className={`custom--button ${button.design}--button`}
            onClick={()=>{button.action()}}>
            {button.label}
          </button>
        )))}
      </div>
    </div>
  )
}

const SectionHeaders = ({title="", buttons, timestamp}) => {
  console.log("timestamp: ", timestamp)
  return(
    <div className="view--header">
      <div className="header--info">
        <h2>{title}</h2>
        {timestamp !== undefined? <span>{`Last updated: ${timestamp}`}</span> : <></>}
      </div>
      <div className="header--buttons">
        {(buttons && buttons.length > 0 && buttons.map((button, i) => (
          <button key={i}
            type="button"
            className={`custom--button ${button.design}--button`}
            onClick={()=>{button.action()}}>
            {button.label}
          </button>
        )))}
      </div>
    </div>
  )
}

export { ViewHeader, SectionHeaders};