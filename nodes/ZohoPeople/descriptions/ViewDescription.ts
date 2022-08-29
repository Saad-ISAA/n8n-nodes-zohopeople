import { INodeProperties } from 'n8n-workflow';

import {
	makeGetAllFields,
} from './SharedFields';

export const viewOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['view'],
			},
		},
		options: [
			{
				name: 'Default And Custom View',
				value: 'defaultAndCustomView',
				description: 'Every form has a default view which displays the original set of records which is also called as the master data. However, you can create a custom view to filter out the records based on the specified field level condition.',
			},
			{
				name: 'Fetch View of a Specific Form',
				value: 'fetchViewOfSpecificForm',
				description: 'used to know the list of views available in a specific form, use the API below by specifying the formLinkName',
			},
		],
		default: 'defaultAndCustomView',
	},
];

export const viewFields: INodeProperties[] = [
	// ----------------------------------------
	//             view
	// ----------------------------------------
];
