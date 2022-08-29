import { INodeProperties } from 'n8n-workflow';
import { capitalizeInitial } from '../GenericFunctions';
import { CamelCaseResource } from '../types';


export const makeGetAllFields = (resource: CamelCaseResource): INodeProperties[] => {
	const loadOptionsMethod = `get${capitalizeInitial(resource)}Fields`;

	return [
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			default: false,
			description: 'Whether to return all results or only up to a given limit',
			displayOptions: {
				show: {
					resource: [resource],
					operation: ['getAll'],
				},
			},
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			default: 5,
			description: 'Max number of results to return',
			typeOptions: {
				minValue: 1,
				maxValue: 1000,
			},
			displayOptions: {
				show: {
					resource: [resource],
					operation: ['getAll'],
					returnAll: [false],
				},
			},
		},
		{
			displayName: 'Options',
			name: 'options',
			type: 'collection',
			placeholder: 'Add Option',
			default: {},
			displayOptions: {
				show: {
					resource: [resource],
					operation: ['getAll'],
				},
			},
			options: [
				{
					displayName: 'Approved',
					name: 'approved',
					type: 'boolean',
					default: true,
					description: 'Whether to retrieve only approved records. Defaults to true.',
				},
				{
					displayName: 'Converted',
					name: 'converted',
					type: 'boolean',
					default: false,
					description: 'Whether to retrieve only converted records. Defaults to false.',
				},
				{
					displayName: 'Fields',
					name: 'fields',
					type: 'multiOptions',
					typeOptions: {
						loadOptionsMethod,
					},
					default: [],
					description: 'Return only these fields',
				},
				{
					displayName: 'Include Child',
					name: 'include_child',
					type: 'boolean',
					default: false,
					description: 'Whether to retrieve only records from child territories',
				},
				{
					displayName: 'Sort By',
					name: 'sort_by',
					type: 'options',
					typeOptions: {
						loadOptionsMethod,
					},
					default: [],
					description: 'Field to sort records by',
				},
				{
					displayName: 'Sort Order',
					name: 'sort_order',
					type: 'options',
					options: [
						{
							name: 'Ascending',
							value: 'asc',
						},
						{
							name: 'Descending',
							value: 'desc',
						},
					],
					default: 'desc',
					description: 'Ascending or descending order sort order',
				},
				{
					displayName: 'Territory ID',
					name: 'territory_id',
					type: 'string',
					default: '',
					description: 'Retrieve only records from this territory',
				},
			],
		},
	];
};
