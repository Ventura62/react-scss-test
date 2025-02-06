
import { Bell, Activity, Menu, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "src/redux/actions";
import { Exit } from 'src/assets/svg';
import { useState } from 'react';

function Topbar({
    theme,
    secondaryMenus,
    activeMainMenu,
    activeSubMenu,
    setActiveSubMenu,
    toggleTheme,
    openSidebar
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutUser = async () => {
        const resultAction = await dispatch(logout())
        if (resultAction && resultAction.payload === undefined) {
            navigate("/login");
        }
    }
    const [userControlsOpen, setUserControlsOpen] = useState(false);

    const userOptions = [
        {
            label: "Log out",
            icon: <Exit />,
            action: () => logoutUser()
        }
    ];
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">

                <button
                    className={`p-2 rounded-lg md:hidden
            ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-200'}`}
                    onClick={openSidebar}
                >
                    <Menu className="h-5 w-5" />
                </button>

                <div className="hidden md:flex gap-4 overflow-x-auto pb-2">
                    {secondaryMenus[activeMainMenu]?.map((item) => {
                        const isActive = activeSubMenu === item;

                        const activeClasses =
                            theme === 'dark'
                                ? 'bg-slate-800 text-white'
                                : 'bg-gray-300 text-gray-900';

                        const inactiveClasses =
                            theme === 'dark'
                                ? 'text-slate-400 hover:bg-slate-800'
                                : 'text-gray-600 hover:bg-gray-200';

                        return (
                            <button
                                key={item}
                                onClick={() => setActiveSubMenu(item)}
                                className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap 
                  ${isActive ? activeClasses : inactiveClasses}`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <button
                    className={`p-2 rounded-lg transition-colors
            ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-200'}`}
                >
                    <Bell className="h-5 w-5" />
                </button>
                <div className={userControlsOpen ? `user--controls` : `user--controls hide`}>
                    {userOptions && userOptions.map((item, i) => (
                        <button
                            key={i}
                            className="custom--button"
                            type="button"
                            onClick={item.action}>
                            <LogOut />
                        </button>
                    ))}
                </div>


                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-colors
            ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-200'}`}
                    title="Toggle Light/Dark Theme"
                >
                    {theme === 'dark' ? '🌞' : '🌙'}
                </button>
            </div>
        </div>
    );
}

export default Topbar;
