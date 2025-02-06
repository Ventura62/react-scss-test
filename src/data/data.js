import { Box, Monitor, AlertTriangle, ShoppingCart } from 'lucide-react';

export const devices = [
    {
        name: "pvt-nj04-sw400",
        lastUpdated: "2025-01-10 07:32:00",
        cpuTemp: 54,
        cpuUsage: 65,
        uptime: 1234567,
        psu1: 1,
        psu2: 1,
        osVersion: "4.25.12M-2GB",
        protocol: "BGP",
        ipAddress: "192.168.147.120",
        state: 1,
        description: "pvt-nj04-sw408",
    },
    {
        name: "pvt-nj04-sw401",
        lastUpdated: "2025-01-10 07:32:10",
        cpuTemp: 52,
        cpuUsage: 40,
        uptime: 2001020,
        psu1: 1,
        psu2: 1,
        osVersion: "4.25.12M-2GB",
        protocol: "BGP",
        ipAddress: "192.168.147.121",
        state: 1,
        description: "pvt-nj04-sw408",
    },
    {
        // The main device from your screenshot
        name: "pvt-nj04-sw402",
        lastUpdated: "2025-01-10 07:32:21",
        cpuTemp: 56,
        cpuUsage: 90,
        uptime: 4195438,
        psu1: 1,
        psu2: 1,
        osVersion: "4.25.12M-2GB",
        protocol: "BGP",
        ipAddress: "192.168.147.128",
        state: 1,
        description: "pvt-nj04-sw408",
    },
    {
        name: "pvt-nj04-sw404",
        lastUpdated: "2025-01-10 07:33:15",
        cpuTemp: 49,
        cpuUsage: 22,
        uptime: 965432,
        psu1: 1,
        psu2: 1,
        osVersion: "4.25.12M-2GB",
        protocol: "BGP",
        ipAddress: "192.168.147.130",
        state: 1,
        description: "pvt-nj04-sw408",
    },
    {
        name: "pvt-nj04-sw405",
        lastUpdated: "2025-01-10 07:35:05",
        cpuTemp: 60,
        cpuUsage: 70,
        uptime: 2345678,
        psu1: 1,
        psu2: 1,
        osVersion: "4.25.12M-2GB",
        protocol: "BGP",
        ipAddress: "192.168.147.131",
        state: 1,
        description: "pvt-nj04-sw408",
    },
    {
        name: "pvt-nj04-sw406",
        lastUpdated: "2025-01-10 07:36:00",
        cpuTemp: 45,
        cpuUsage: 10,
        uptime: 1111111,
        psu1: 1,
        psu2: 1,
        osVersion: "4.25.12M-2GB",
        protocol: "BGP",
        ipAddress: "192.168.147.132",
        state: 1,
        description: "pvt-nj04-sw408",
    },
];

export const randomServers = Array.from({ length: 8 }, (_, i) => ({
    name: `srv-${String.fromCharCode(97 + i)}${Math.floor(Math.random() * 100)}`,
    cpuTemp: Math.floor(Math.random() * 20) + 30,
    cpuUsage: Math.floor(Math.random() * 100),
    uptime: Math.floor(Math.random() * 24) + 1,
    psu1: 'OK',
    psu2: 'OK',
    version: `4.23.${Math.floor(Math.random() * 100)}M-2GB`
}));

export const trafficData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    inbound: Math.floor(Math.random() * 8000) + 2000,
    outbound: Math.floor(Math.random() * 6000) + 1000
}));

export const errorData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    errors: Math.floor(Math.random() * 5)
}));

export const incidents = [
    {
        title: 'High CPU utilization on core router',
        priority: 'critical',
        openTime: '2h 15m ago'
    },
    {
        title: 'Link flapping on distribution switch',
        priority: 'high',
        openTime: '45m ago'
    },
    {
        title: 'BGP session down with ISP2',
        priority: 'critical',
        openTime: '1h 30m ago'
    }
];

export const interfaces = Array.from({ length: 20 }, (_, i) => ({
    name: `Ethernet${i + 1}`,
    description: `ny${i + 1}-sw${Math.floor(Math.random() * 5) + 1}`,
    inboundRate: (Math.random() * 10).toFixed(2),
    outboundRate: (Math.random() * 8).toFixed(2),
    inboundErrors: Math.floor(Math.random() * 3),
    outboundErrors: Math.floor(Math.random() * 2),
    status: Math.random() > 0.95 ? 'DOWN' : 'UP',
    lastChange: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m ago`
}));

export const mainMenuItems = [
    { id: 'monitor', label: 'Monitor', icon: Monitor },
    { id: 'infrastructure', label: 'Infrastructure', icon: Box },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'procurement', label: 'Procurement', icon: ShoppingCart },
];

export const secondaryMenus = {
    monitor: ['Overview', 'Interfaces', 'Routing Protocols', 'Reachability', 'Market Data'],
    infrastructure: ['Servers', 'Network', 'Storage', 'Containers'],
    alerts: ['Active', 'History', 'Settings'],
    procurement: ['Orders', 'Inventory', 'Suppliers'],
};