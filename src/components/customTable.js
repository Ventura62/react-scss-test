import React from "react";
import { Table, Spinner, Input } from "reactstrap";
import CustomAlert from "src/components/customAlert";

import { capitalize } from "src/utils/others";

const CustomTable = ({
  actions,
  data = [],
  filters = [],
  handleFilters = false,
  loading = false,
  hasActions = false
}) => {
  return(
    <div className="custom--table">
      <Table>
        <thead>
          <tr>
            {filters && filters.length > 0 && filters.map((it, i)=>{
              return (
                <th key={i}>
                  {it.label}
                </th>
              )
            })}
            {!!hasActions && <th rowSpan={2}>Acciones</th>}
          </tr>
          <tr>
            {handleFilters !== false && filters && filters.length > 0 && filters.map((it, i) => {
              if (!!it.hasFilter) {
                if(it.type === "select"){
                  return (
                    <th key={i}>
                      <Input
                        id={it.name}
                        type={it.type}
                        name={it.filterName}
                        value={it.value}
                        onChange={(ev) => handleFilters(ev, 'select')}
                        className="custom--inputs">
                        <option
                          value="-"
                          className="like--disabled">
                          Buscar
                        </option>
                        {it && it.options && Array.isArray(it.options) && it.options.map((jt, j) =>{
                          return(
                            <option key={j} value={jt.value}>{capitalize(jt.label)}</option>
                            )
                          }
                        )}
                      </Input>
                    </th>
                  )
                } else if (it.type === "search"){
                  return (
                    <th key={i}>
                      <Input
                        id={it.name}
                        type={it.type}
                        name={it.filterName}
                        value={it.value}
                        placeholder={it.placeholder}
                        onKeyDown={(ev) => handleFilters(ev, 'keyPress')}
                        onBlur={(ev) => handleFilters(ev, 'lostFocus')}
                        onChange={(ev) => handleFilters(ev, 'onChange')}
                        className="custom--inputs"/>
                    </th>
                  )
                }
              } else {
                return (
                  <th key={i}></th>
                )
              }
            })}
          </tr>
        </thead>
        <tbody>
          {!!loading &&
            <tr>
              <td colSpan={filters.length+1}>
                <CustomAlert>
                  <Spinner/>
                </CustomAlert>
              </td>
            </tr>
          }
          {data && Array.isArray(data) && data.length === 0 &&
            <tr>
              <td colSpan={filters.length+1}>
                <CustomAlert color="warning">
                  No se encontraron registros.
                </CustomAlert>
              </td>
            </tr>
          }
          {data?.length > 0 && data.map((item, i) => (
            <tr key={i}>
              {
                filters && filters.map((jt, j) => {
                  if (item.hasOwnProperty(`${jt.name}`)) {
                    if (item[jt.name] !== "" && jt.isformat){
                      const format = jt.format(item[jt.name], item)
                      return(
                        <td key={`${i}-${j}`}>{format}</td>
                      )
                    } else if (item[jt.name] !== ""){
                      return(
                        <td key={`${i}-${j}`}>{item[jt.name]}</td>
                      )
                    }else{
                      return (<td key={`${i}-${j}`}>-</td>)
                    }
                  }
                })
              }
              {!!hasActions &&
                <td className="action--cell">
                  {actions(it)}
                </td>
              }
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default CustomTable;