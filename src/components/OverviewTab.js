import React from 'react';
import {
    Thermometer,
    Cpu,
    Clock,
    Power,
    AlertCircle
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

function OverviewTab({ theme, randomServers, trafficData, errorData, incidents }) {
    const server = randomServers[0];
    const cardBg = theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200';

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div className={`${cardBg} p-6 rounded-xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-600 dark:text-slate-400">CPU Temperature</h3>
                        <div className="h-8 w-8 bg-orange-100/50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500 rounded-lg flex items-center justify-center">
                            <Thermometer className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold mb-2">
                        {server.cpuTemp}°C
                    </div>
                </div>

                <div className={`${cardBg} p-6 rounded-xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-600 dark:text-slate-400">CPU Utilization</h3>
                        <div className="h-8 w-8 bg-blue-100/50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500 rounded-lg flex items-center justify-center">
                            <Cpu className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold mb-2">
                        {server.cpuUsage}%
                    </div>
                </div>

                <div className={`${cardBg} p-6 rounded-xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-600 dark:text-slate-400">Device Uptime</h3>
                        <div className="h-8 w-8 bg-purple-100/50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-500 rounded-lg flex items-center justify-center">
                            <Clock className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold mb-2">
                        {server.uptime}

                    </div>
                </div>


                <div className={`${cardBg} p-6 rounded-xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-600 dark:text-slate-400">Power Supply</h3>
                        <div className="h-8 w-8 bg-green-100/50 dark:bg-emerald-500/20 text-green-600 dark:text-emerald-500 rounded-lg flex items-center justify-center">
                            <Power className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">PSU1</div>
                            <div className="text-xl font-bold text-green-700 dark:text-emerald-500">
                                {server.psu1}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">PSU2</div>
                            <div className="text-xl font-bold text-green-700 dark:text-emerald-500">
                                {server.psu2}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className={`${cardBg} p-6 rounded-xl`}>
                    <h3 className="text-xl font-bold mb-6 text-gray-700 dark:text-white">
                        Interface Traffic
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="inbound" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="outbound" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke={theme === 'dark' ? '#334155' : '#cbd5e1'}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        color: theme === 'dark' ? '#f8fafc' : '#111827'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="inbound"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#inbound)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="outbound"
                                    stroke="#10b981"
                                    fillOpacity={1}
                                    fill="url(#outbound)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={`${cardBg} p-6 rounded-xl`}>
                    <h3 className="text-xl font-bold mb-6 text-gray-700 dark:text-white">
                        Interface Errors
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={errorData}>
                                <XAxis dataKey="time" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke={theme === 'dark' ? '#334155' : '#cbd5e1'}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        color: theme === 'dark' ? '#f8fafc' : '#111827'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="errors"
                                    stroke="#ef4444"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className={`${cardBg} rounded-xl p-6`}>
                <h2 className="text-xl font-bold mb-6 text-gray-700 dark:text-white">
                    Device Health
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr
                                className={`border-b ${theme === 'dark'
                                    ? 'border-slate-700 text-slate-400'
                                    : 'border-slate-300 text-gray-600'
                                    }`}
                            >
                                <th className="pb-4">Hostname</th>
                                <th className="pb-4">CPU Temp</th>
                                <th className="pb-4">CPU Usage</th>
                                <th className="pb-4">Uptime</th>
                                <th className="pb-4">PSU1</th>
                                <th className="pb-4">PSU2</th>
                                <th className="pb-4">Version</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {randomServers?.map((srv) => (
                                <tr
                                    key={srv.name}
                                    className={`border-b ${theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200'
                                        }`}
                                >
                                    <td className="py-4 font-medium text-gray-700 dark:text-white">
                                        {srv.name}
                                    </td>
                                    <td className="py-4">{srv.cpuTemp}°C</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            <span>{srv.cpuUsage}%</span>
                                            <div
                                                className={`w-20 h-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
                                                    }`}
                                            >
                                                <div
                                                    className={`h-full rounded-full ${srv.cpuUsage > 90
                                                        ? 'bg-red-500'
                                                        : srv.cpuUsage > 70
                                                            ? 'bg-yellow-500'
                                                            : 'bg-emerald-500'
                                                        }`}
                                                    style={{ width: `${srv.cpuUsage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">{srv.uptime}</td>
                                    <td className="py-4">
                                        <span
                                            className="px-2 py-1 bg-green-100 dark:bg-emerald-500/20
                      text-green-600 dark:text-emerald-500 rounded-full text-xs"
                                        >
                                            {srv.psu1}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <span
                                            className="px-2 py-1 bg-green-100 dark:bg-emerald-500/20
                      text-green-600 dark:text-emerald-500 rounded-full text-xs"
                                        >
                                            {srv.psu2}
                                        </span>
                                    </td>
                                    <td className="py-4 text-slate-600 dark:text-slate-400">
                                        {srv.version}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={`${cardBg} rounded-xl p-6`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-gray-700 dark:text-white">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Current Incidents
                    </h2>
                    <span
                        className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-full text-sm"
                    >
                        {incidents.length} Active
                    </span>
                </div>
                <div className="space-y-4">
                    {incidents?.map((incident, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-300/50'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        Opened {incident.openTime}
                                    </span>
                                </div>
                                <span
                                    className="px-2 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-full text-xs uppercase"
                                >
                                    {incident.priority}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-slate-300">
                                {incident.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}

export default OverviewTab;
