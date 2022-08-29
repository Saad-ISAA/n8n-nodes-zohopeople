import { INodeProperties } from 'n8n-workflow';

import {
	makeGetAllFields,
} from './SharedFields';

export const formOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['forms'],
			},
		},
		options: [
			{
				name: 'Fetch Forms',
				value: 'fetchForms',
				description: 'used to retrieve the list of forms and its details available in your Zoho People account',
			},
			{
				name: 'Get Bulk Records',
				value: 'getBulkRecords',
				description: 'used to fetch bulk records along with its tabular section details from particular forms',
			},
		],
		default: 'fetchForms',
	},
];

export const formFields: INodeProperties[] = [
	// ----------------------------------------
	//             form: getAll
	// ----------------------------------------
	// ...makeGetAllFields('form'),
	{
		displayName: 'Form Link Name',
		name: 'formLinkName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Start Index',
		name: 'sIndex',
		type: 'number',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		required: true,
		default: 200,
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Search Column',
		name: 'searchColumn',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Search Value',
		name: 'searchValue',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Modified Time',
		name: 'modifiedtime',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
];
