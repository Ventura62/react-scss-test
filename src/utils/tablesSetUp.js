export const healtMetricsColumns = () => {
	const healthMetricsHeaders = [
		{
			name: 'hostname',
			filterName: 'hostname',
			label: 'Hostname',
			hasFilter: false,
			type: '',
			placeholder: '',
			value: '',
			active: true,
			isformat: false,
			format: null
		},
		{
			name: 'cpuTemperature',
			filterName: 'cpuTemperature',
			label: 'CPU temperature (°C)',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		},
		{
			name: 'cpuUtilization',
			filterName: 'cpuUtilization',
			label: 'CPU utilization (%)',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		},
		{
			name: 'deviceUptime',
			filterName: 'deviceUptime',
			label: 'Device Uptime (Months)',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		},{
			name: 'osVersion',
			filterName: 'osVersion',
			label: 'OS Version',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		},
		{
			name: 'psu1',
			filterName: 'psu1',
			label: 'PSU 1',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		},
		{
			name: 'psu2',
			filterName: 'psu2',
			label: 'PSU 2',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		}
	];
	return healthMetricsHeaders;
}

export const protocolMetricsColumns = () => {
	const protocolMetricsHeaders = [
		{
			name: 'hostname',
			filterName: 'hostname',
			label: 'Hostname',
			hasFilter: false,
			type: '',
			placeholder: '',
			value: '',
			active: true,
			isformat: false,
			format: null
		},
		{
			name: 'neiDescription',
			filterName: 'neiDescription',
			label: 'Description',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		},
		{
			name: 'neighbor',
			filterName: 'neighbor',
			label: 'IP Address',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		},
		{
			name: 'peerState',
			filterName: 'peerState',
			label: 'State',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		},{
			name: 'protocol',
			filterName: 'protocol',
			label: 'Protocol',
			hasFilter: false,
			type: 'search',
			placeholder: 'Buscar',
			value: '',
			active: true,
			isformat: false,
			format: null
		}
	];
	return protocolMetricsHeaders;
}