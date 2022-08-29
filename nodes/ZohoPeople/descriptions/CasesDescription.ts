import { INodeProperties } from 'n8n-workflow';

import {
	makeGetAllFields,
} from './SharedFields';

export const casesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cases'],
			},
		},
		options: [
			{
				name: 'View List of categories',
				value: 'listCategory',
				description: 'used to list categories that a user case raise query to',
			},
			{
				name: 'View Case Details',
				value: 'viewcase',
				description: ' used to view case details',
			},
		],
		default: 'listCategory',
	},
];

export const casesFields: INodeProperties[] = [
	// ----------------------------------------
	//             cases
	// ----------------------------------------
	{
		displayName: 'Record Id',
		name: 'recordId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['cases'],
				operation: ['viewcase'],
			},
		},
	},
];
