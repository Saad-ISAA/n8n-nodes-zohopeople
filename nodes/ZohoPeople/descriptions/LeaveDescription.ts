import { INodeProperties } from 'n8n-workflow';

import {
	makeGetAllFields,
} from './SharedFields';

export const leaveOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['leave'],
			},
		},
		options: [
			{
				name: 'Get Leave Types',
				value: 'getLeaveTypes',
				description: 'Can be used to get leave types of a specific employee',
			},
			{
				name: 'Get Holidays',
				value: 'getHolidays',
				description: 'used to fetch specific holidays of any employees using their employee ID, email ID and record ID parameters',
			},
		],
		default: 'getLeaveTypes',
	},
];

export const leaveFields: INodeProperties[] = [
	// ----------------------------------------
	//             leave
	// ----------------------------------------
	{
		displayName: 'User Id',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getLeaveTypes', 'getHolidays'],
			},
		},
	},
];
