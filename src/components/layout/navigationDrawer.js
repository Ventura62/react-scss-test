import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { getCurrentUser } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function Drawer({
    theme,
    mainMenuItems,
    activeMainMenu,
    setActiveMainMenu,
    activeSubMenu,
    setActiveSubMenu,
    secondaryMenus,
    sidebarOpen,
    closeSidebar,
    customItems = [],
    onSelectCustomItem = () => { },
    selectedCustomItem = "",
}) {
    const containerClasses = `
    fixed top-0 left-0 h-full w-64 p-4 z-50
    transform transition-transform
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:block
    ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-800'}
  `;

    return (
        <div className={containerClasses}>

            <div className="flex items-center justify-between mb-4 md:hidden">
                <span className="font-bold text-xl">Menu</span>
                <button onClick={closeSidebar} className="p-2 hover:bg-slate-700 rounded">
                    <X className="h-5 w-5" />
                </button>
            </div>


            <nav className="space-y-2 mb-6">
                {mainMenuItems?.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeMainMenu === item.id;

                    const activeClasses =
                        theme === 'dark'
                            ? 'bg-slate-700 text-white'
                            : 'bg-gray-300 text-gray-900';
                    const inactiveClasses =
                        theme === 'dark'
                            ? 'text-slate-400 hover:bg-slate-700/50'
                            : 'text-gray-600 hover:bg-gray-300/50';

                    return (
                        <div
                            key={item.id}
                            onClick={() => {
                                setActiveMainMenu(item.id);
                                // setActiveSubMenu(secondaryMenus[item.id][0]);
                                closeSidebar();
                            }}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors 
                ${isActive ? activeClasses : inactiveClasses}`}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </div>
                    );
                })}
            </nav>

            {activeMainMenu === 'monitor' && customItems.length > 0 && (
                <div>
                    <h3 className="text-sm uppercase tracking-wider mb-2 font-semibold text-slate-500 dark:text-slate-400">
                        Monitors
                    </h3>
                    <nav className="space-y-1">
                        {customItems?.map((item) => {
                            const isSelected = item.id === selectedCustomItem;
                            const activeClasses =
                                theme === 'dark'
                                    ? 'bg-slate-700 text-white'
                                    : 'bg-gray-300 text-gray-900';
                            const inactiveClasses =
                                theme === 'dark'
                                    ? 'text-slate-400 hover:bg-slate-700/50'
                                    : 'text-gray-600 hover:bg-gray-300/50';

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        onSelectCustomItem(item.id);
                                        closeSidebar();
                                    }}
                                    className={`cursor-pointer flex items-center gap-2 p-2 rounded-md transition-colors 
                    ${isSelected ? activeClasses : inactiveClasses}`}
                                >
                                    <span>{item.label}</span>
                                </div>
                            );
                        })}
                    </nav>
                </div>
            )}
        </div>
    );
}

export default Drawer;
