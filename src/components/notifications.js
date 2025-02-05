import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

import { getColor } from 'src/utils/getDefinedStyles';
import { CircleCheck, CircleExclamation, CircleInfo, CircleXMark} from 'src/assets/svg';

const NotificationsManager = () => {

  const notification = useSelector((state)=>state.general.notifications);
  const [list, setList] = useState([]);
  const icons = {
    "success": <CircleCheck/>,
    "warning": <CircleExclamation/>,
    "info": <CircleInfo/>,
    "danger": <CircleXMark/>
  }

  useEffect(()=>{
    if(notification.length > 0){
      addNotification(notification[notification.length-1])
    }
  },[notification])

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      type: notification.type,
      title: notification.title, //notification.title.charAt(0).toUpperCase() + notification.title.slice(1),
      message: notification.message
    };
    setList(prevList => [...prevList, newNotification]);
    setTimeout(() => {
      setList(prevList =>
        prevList.filter(notification => notification.id !== newNotification.id)
      );
    }, 5000);
  };

  const removeNotification = (id) => {
    setList(prevList =>
      prevList.filter(notification => notification.id !== id)
    );
  };

  return(
    <div className="toast-container position-fixed top-0 end-0">
      {list && list.length > 0 && list.map((notification, index) => {
        return (
          <Toast key={index} className="custom--toast">
            <ToastHeader
              style={{
                background:`${getColor(`${notification.type}`).value}`
              }}
              toggle={() => { removeNotification(notification.id) }}>
                {icons[`${notification.type}`]} {notification.title}
            </ToastHeader>
            <ToastBody
              style={{
                background:`${getColor('gray-100').value}`,
                color: `${getColor('gray-900').value}`
              }}>
              {notification.message}
            </ToastBody>
          </Toast>
        )
      })}
    </div>
  )
}

export default NotificationsManager;