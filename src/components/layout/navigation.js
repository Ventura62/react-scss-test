import React, {useState, useEffect, useRef} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { getCurrentUser } from 'aws-amplify/auth';

import { logout } from "src/redux/actions";
import { getViews } from 'src/utils/routes';
import {UserIcon, NotificationsCampaing, Logo, AngleUp, Exit} from 'src/assets/svg';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const clientSelectorRef = useRef(null);

  const [userId, setUserId] = useState("");
  const [navItems, setNavItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "client 1",
      status: "Offline"
    },
    {
      id: 2,
      name: "client 2",
      status: "Inactive"
    },
    {
      id: 3,
      name: "client 3",
      status: "Active"
    }
  ]);

  const [userControlsOpen, setUserControlsOpen] = useState(false);
  const userOptions = [
    {
      label: "Log out",
      icon: <Exit/>,
      action: ()=>logoutUser()
    }
  ];

  useEffect(()=>{
    setNavItems(getNavItems)
  },[])

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user && user.signInDetails && user.signInDetails.loginId) {
          setUserId(user.signInDetails.loginId);
        }else{
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };
    checkUser();
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clientSelectorRef.current && !clientSelectorRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutUser = async () => {
    const resultAction = await dispatch(logout())
    if (resultAction && resultAction.payload === undefined){
      navigate("/login");
    }
  }

  const getNavItems = () => {
    return getViews((routePath) => ({
      route: routePath,
      name: routePath.charAt(0).toUpperCase() + routePath.slice(1),
    }));
  }

  return(
    <div className="custom--navigation">
      <div className="navigation--section">
        <a href="/" className="logo-container">
          <Logo width="auto" height="60px"/>
        </a>
        <div className="user--data">
          <div>
            <NotificationsCampaing/>
            <Exit/>
          </div>
          <div className="user--controls">
            <div>
              <div>
                <UserIcon/>
              </div>
              <div>
                {userId}
              </div>
              <button
                type="button"
                className="custom--button"
                onClick={() => setUserControlsOpen((prevState) => !prevState)}>
                <AngleUp rotation={userControlsOpen? 180 : 0}/>
              </button>
            </div>
            <div className={userControlsOpen ? `user--controls`:`user--controls hide`}>
              {userOptions && userOptions.map((item, i) => (
                <button
                  key={i}
                  className="custom--button"
                  type="button"
                  onClick={item.action}>
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="navigation--section">
        <div className="client--selector" ref={clientSelectorRef}>
          <button
            className="custom--button nav--button client--selector--button"
            onClick={() => setDropdownOpen((prevState) => !prevState)}>
            Client
          </button>
          <div className={dropdownOpen?`clients--container`:`clients--container hide`}>
            {clients && clients.length > 0 && clients.map((client, i) => (
              <div className="client--item" key={i}>
                  {client.name}
              </div>
            ))}
          </div>
        </div>
        {navItems && navItems.length>0 && navItems.map((navItem, i)=>(
          <div
            key={i}
            className={location.pathname === `/${navItem.route}`? `view--selector active`:`view--selector`}>
            <button
              className="custom--button nav--button"
              onClick={()=>{navigate(`/${navItem.route}`)}}>
              {navItem.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NavigationBar;