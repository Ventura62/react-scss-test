
import { Network, Activity, AlertCircle, AlertTriangle } from 'lucide-react';

function InterfacesTab({ theme, interfaces }) {
    const total = interfaces.length;
    const upCount = interfaces.filter(i => i.status === 'UP').length;
    const downCount = interfaces.filter(i => i.status === 'DOWN').length;
    const totalErrors = interfaces.reduce((acc, curr) =>
        acc + curr.inboundErrors + curr.outboundErrors, 0
    );

    const cardBg = theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200';
    const borderColor = theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200';

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div className={`${cardBg} p-6 rounded-xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-600 dark:text-slate-400">Total Interfaces</h3>
                        <div className="h-8 w-8 bg-blue-100/50 dark:bg-blue-500/20
              text-blue-600 dark:text-blue-500 rounded-lg flex items-center justify-center">
                            <Network className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold  ">
                        {total}
                    </div>
                </div>

                <div className={`${cardBg} p-6 rounded-xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-600 dark:text-slate-400">Active Interfaces</h3>
                        <div className="h-8 w-8 bg-green-100/50 dark:bg-emerald-500/20
              text-green-600 dark:text-emerald-500 rounded-lg flex items-center justify-center">
                            <Activity className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold  ">
                        {upCount}
                    </div>
                </div>


                <div className={`${cardBg} p-6 rounded-xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-600 dark:text-slate-400">Down Interfaces</h3>
                        <div className="h-8 w-8 bg-red-100/50 dark:bg-red-500/20
              text-red-600 dark:text-red-500 rounded-lg flex items-center justify-center">
                            <AlertCircle className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold  ">
                        {downCount}
                    </div>
                </div>


                <div className={`${cardBg} p-6 rounded-xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-slate-600 dark:text-slate-400">Total Errors</h3>
                        <div className="h-8 w-8 bg-yellow-100/50 dark:bg-yellow-500/20
              text-yellow-600 dark:text-yellow-500 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="text-4xl font-bold  ">
                        {totalErrors}
                    </div>
                </div>
            </div>


            <div className={`${cardBg} rounded-xl p-6`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-700 ">
                        Interface Status
                    </h2>
                    <div className="flex gap-2">
                        <span
                            className="px-3 py-1 bg-green-100 dark:bg-emerald-500/20
              text-green-600 dark:text-emerald-500 rounded-full text-sm"
                        >
                            {upCount} Up
                        </span>
                        <span
                            className="px-3 py-1 bg-red-100 dark:bg-red-500/20
              text-red-600 dark:text-red-500 rounded-full text-sm"
                        >
                            {downCount} Down
                        </span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className={`border-b ${borderColor}
                text-gray-600 dark:text-slate-400 text-left`}
                            >
                                <th className="pb-4">Interface</th>
                                <th className="pb-4">Description</th>
                                <th className="pb-4">Inbound (Mb/s)</th>
                                <th className="pb-4">Outbound (Mb/s)</th>
                                <th className="pb-4">Errors In</th>
                                <th className="pb-4">Errors Out</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Last Change</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {interfaces?.map((iface) => {
                                const inboundErrClass =
                                    iface.inboundErrors > 0
                                        ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500'
                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400';
                                const outboundErrClass =
                                    iface.outboundErrors > 0
                                        ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500'
                                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400';
                                const statusClass =
                                    iface.status === 'UP'
                                        ? 'bg-green-100 dark:bg-emerald-500/20 text-green-600 dark:text-emerald-500'
                                        : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500';

                                return (
                                    <tr key={iface.name} className={`border-b ${borderColor}`}>
                                        <td className="py-4 font-medium text-gray-700 ">
                                            {iface.name}
                                        </td>
                                        <td className="py-4 text-slate-500 dark:text-slate-400">
                                            {iface.description}
                                        </td>
                                        <td className="py-4">{iface.inboundRate}</td>
                                        <td className="py-4">{iface.outboundRate}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${inboundErrClass}`}>
                                                {iface.inboundErrors}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${outboundErrClass}`}>
                                                {iface.outboundErrors}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${statusClass}`}>
                                                {iface.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-slate-500 dark:text-slate-400">
                                            {iface.lastChange}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InterfacesTab;
