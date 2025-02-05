import React, {useState, useEffect} from "react";
import { Badge } from "reactstrap";

import SearchInput from "src/components/searchInput";
import {AngleUp} from 'src/assets/svg';

const Sidebar = ({items, selectItem, selectedItem, sidebarStatus, changeSidebarStatus}) => {

  const [monitors, setMonitors] = useState([]);
  useEffect(() => {setMonitors(items)},[items])

  return(
    <div className={sidebarStatus? `custom--sidebar`:`custom--sidebar close`}>
      <button
        onClick={changeSidebarStatus}
        type="button"
        className="custom--button sidebar--button">
        <AngleUp
          size="md"
          rotation={sidebarStatus? 90:270}/>
      </button>
      <div>
        {monitors && monitors.length > 0 && monitors.map((item, i) => (
          <button
            key={i}
            className={selectedItem && selectedItem.hostname && item.hostname === selectedItem.hostname? `dark--button sidebar--item` : `sidebar--item`}
            onClick={ev => selectItem(item)}>
            <span>{item.hostname}</span>
            <Badge className="sidebar--badge" color="none">{item.status}</Badge>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar