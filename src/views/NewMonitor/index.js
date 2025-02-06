import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getAllHealthMetrics,
    getAllProtocolsMetrics,

} from "src/redux/actions";
import { Box, Monitor, AlertTriangle, LucideSettings, UserCircle2 } from 'lucide-react';

import Drawer from "src/components/layout/navigationDrawer";
import Topbar from "src/components/layout/topbar";
import OverviewTab from "src/components/OverviewTab";
import InterfacesTab from "src/components/InterfacesTab";

import MonitorLoader from "src/views/monitor/loader";
import { useTheme } from "src/context/theme.js";
import Configure from "../configure";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@aws-amplify/auth";
export const mainMenuItems = [
    { id: 'monitor', label: 'Monitor', icon: Monitor },
    { id: 'configure', label: 'Configure', icon: LucideSettings },
    { id: 'clent', label: 'Clent', icon: UserCircle2 },
];

export const secondaryMenus = {
    monitor: ['Overview', 'Interfaces'],
    infrastructure: ['Servers', 'Network', 'Storage', 'Containers'],
    alerts: ['Active', 'History', 'Settings'],
    procurement: ['Orders', 'Inventory', 'Suppliers'],
};
export const trafficData = Array.from({ length: 1 }, (_, i) => ({
    time: `${i}:00`,
    inbound: Math.floor(Math.random() * 8000) + 2000,
    outbound: Math.floor(Math.random() * 6000) + 1000
}));

export const errorData = Array.from({ length: 1 }, (_, i) => ({
    time: `${i}:00`,
    errors: Math.floor(Math.random() * 5)
}));

function MergedMonitor() {
    const dispatch = useDispatch();
    const monitorState = useSelector((state) => state.monitor);

    const { theme, toggleTheme } = useTheme();

    const [activeMainMenu, setActiveMainMenu] = useState("monitor");
    const [activeSubMenu, setActiveSubMenu] = useState("Overview");

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [healthMetrics, setHealthMetrics] = useState([]);
    const [protocols, setProtocols] = useState([]);
    const [traffic, setTraffic] = useState([]);
    const [errors, setErrors] = useState([]);
    const [incidents, setIncidents] = useState([]);

    const [monitors, setMonitors] = useState([]);
    const [selectedMonitor, setSelectedMonitor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await getCurrentUser();
                if (user && user.signInDetails && user.signInDetails.loginId) {

                } else {
                    navigate("/login");
                }
            } catch (error) {
                navigate("/login");
            }
        };
        checkUser();
    })
    useEffect(() => {
        if (!monitorState.healthMetricsObtained) {
            dispatch(getAllHealthMetrics("", ""));
        }
        if (!monitorState.protocolsObtained) {
            dispatch(getAllProtocolsMetrics("", ""));
        }

    }, [dispatch,
        monitorState.healthMetricsObtained,
        monitorState.protocolsObtained,

    ]);
    useEffect(() => {
        setHealthMetrics(monitorState.healthMetrics || []);
    }, [monitorState.healthMetrics]);

    useEffect(() => {
        setProtocols(monitorState.protocolsMetrics || []);
    }, [monitorState.protocolsMetrics]);

    useEffect(() => {
        setTraffic(monitorState.trafficData || []);
    }, [monitorState.trafficData]);

    useEffect(() => {
        setErrors(monitorState.errorData || []);
    }, [monitorState.errorData]);

    useEffect(() => {
        setIncidents(monitorState.incidents || []);
    }, [monitorState.incidents]);

    useEffect(() => {
        if (healthMetrics.length > 0 && protocols.length > 0) {
            const protoMap = new Map(protocols?.map((p) => [p.hostname, p]));
            const mergedData = healthMetrics?.map((hm) => {
                const foundProtocol = protoMap.get(hm.hostname);
                return {
                    hostname: hm.hostname,
                    clientId: hm.clientId,
                    health: {
                        metrics: hm.metrics,
                        timestamp: hm.timestamp,
                        ...hm.data,
                    },
                    protocols: foundProtocol
                        ? {
                            protocol: foundProtocol.protocol,
                            metrics: foundProtocol.metrics,
                            timestamp: foundProtocol.timestamp,
                            ...foundProtocol.data,
                        }
                        : {},
                };
            });
            setMonitors(mergedData);
        }
    }, [healthMetrics, protocols]);

    const isLoading =
        !monitorState.healthMetricsObtained ||
        !monitorState.protocolsObtained ||


        monitors.length === 0;

    if (isLoading) {
        return <MonitorLoader />;
    }


    const renderContent = () => {
        if (activeMainMenu === "configure") {
            return <Configure />

        }
        if (activeMainMenu === "client") {
            return <div className="p-4 text-gray-700 dark:text-white">
                <h1 className="text-2xl font-bold mb-4 capitalize">
                    {activeMainMenu} - {activeSubMenu}
                </h1>
                <p>This is a Client page.</p>
            </div>

        }
        if (activeMainMenu === "monitor") {
            if (activeSubMenu === "Interfaces") {

                return (
                    <InterfacesTab
                        theme={theme}
                        interfaces={
                            selectedMonitor?.health?.interfaces || []
                        }
                    />
                );
            }

            if (!selectedMonitor) {
                return (
                    <div className="p-4 text-gray-700 dark:text-white">
                        <h2 className="text-xl font-bold mb-4">No monitor selected</h2>
                        <p>Please select a monitor from the sidebar.</p>
                    </div>
                );
            }

            const singleServerData = [
                {
                    name: selectedMonitor.hostname,
                    cpuTemp: selectedMonitor.health?.cpuTemperature || 0,
                    cpuUsage: selectedMonitor.health?.cpuUtilization || 0,
                    uptime: selectedMonitor.health?.deviceUptime || 0,
                    psu1: selectedMonitor.health?.psu1 || 0,
                    psu2: selectedMonitor.health?.psu2 || 0,
                    version: selectedMonitor.health?.osVersion || 0,
                },
            ];


            return (
                <OverviewTab
                    theme={theme}
                    randomServers={singleServerData}
                    trafficData={trafficData}
                    errorData={errorData}
                    incidents={incidents}
                />
            );
        }

        return (
            <div className="p-4 text-gray-700 dark:text-white">
                <h1 className="text-2xl font-bold mb-4 capitalize">
                    {activeMainMenu} - {activeSubMenu}
                </h1>
                <p>This is a placeholder page.</p>
            </div>
        );
    };

    const customSidebarItems = monitors?.map((m) => ({
        id: m.hostname,
        label: m.hostname,
    }));

    const onSelectMonitor = (hostname) => {
        const found = monitors.find((m) => m.hostname === hostname);
        setSelectedMonitor(found || null);
    };


    return (
        <div
            className={`min-h-screen transition-colors ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-gray-800"
                }`}
        >
            <Drawer
                theme={theme}
                mainMenuItems={mainMenuItems}
                activeMainMenu={activeMainMenu}
                setActiveMainMenu={setActiveMainMenu}
                activeSubMenu={activeSubMenu}
                setActiveSubMenu={setActiveSubMenu}
                secondaryMenus={secondaryMenus}
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}

                customItems={customSidebarItems}
                onSelectCustomItem={onSelectMonitor}
                selectedCustomItem={selectedMonitor?.hostname || ""}
            />

            <div className="md:ml-64 p-6 transition-all">
                <Topbar
                    theme={theme}
                    secondaryMenus={secondaryMenus}
                    activeMainMenu={activeMainMenu}
                    activeSubMenu={activeSubMenu}
                    setActiveSubMenu={setActiveSubMenu}
                    toggleTheme={toggleTheme}
                    openSidebar={() => setSidebarOpen(true)}
                />

                {renderContent()}
            </div>
        </div>
    );
}

export default MergedMonitor;
