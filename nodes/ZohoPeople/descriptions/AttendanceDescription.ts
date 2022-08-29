import { INodeProperties } from 'n8n-workflow';

import {
	makeGetAllFields,
} from './SharedFields';

export const attendanceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['attendance'],
			},
		},
		options: [
			{
				name: 'Fetch Last Attendance Entries',
				value: 'fetchLastAttendanceEntries',
				description: 'fetches the latest attendance entries with Regularisation entries that has been added/updated within the latest minutes(given in param)',
			},
			{
				name: 'Shift Details Of Employee',
				value: 'shiftDetailsOfEmployee',
				description: 'used to fetch the shift configuration details of an employee',
			},
		],
		default: 'shiftDetailsOfEmployee',
	},
];

export const attendanceFields: INodeProperties[] = [
	// ----------------------------------------
	//             attendance
	// ----------------------------------------
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'number',
		required: true,
		default: 5,
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['fetchLastAttendanceEntries'],
			},
		},
	},
	{
		displayName: 'Date Time Format',
		name: 'dateTimeFormat',
		type: 'string',
		required: true,
		default: 'dd-MM-yyyy HH:mm:ss',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['fetchLastAttendanceEntries'],
			},
		},
	},
	{
		displayName: 'Employee Id',
		name: 'empId',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},
	{
		displayName: 'Email Id',
		name: 'emailId',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},
	{
		displayName: 'Map Id',
		name: 'mapId',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},
	{
		displayName: 'Start Date',
		name: 'sdate',
		type: 'string',
		required: true,
		default: '2022-08-01',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'edate',
		type: 'string',
		required: true,
		default: '2022-08-30',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},
];
