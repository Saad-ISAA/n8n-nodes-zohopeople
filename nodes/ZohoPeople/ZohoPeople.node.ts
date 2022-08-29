import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	NodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

import { zohoApiRequest } from './GenericFunctions';

import {
	OptionsWithUri,
} from 'request';

import { formFields, formOperations } from './descriptions/FormDescription';
import { GetAllFilterOptions } from './types';

export class ZohoPeople implements INodeType {
	description: INodeTypeDescription = {
			displayName: 'Zoho People',
			name: 'zohopeople',
			icon: 'file:zohopeople.svg',
			group: ['transform'],
			version: 1,
			subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
			description: 'Consume Zoho People API',
			defaults: {
					name: 'ZohoPeople',
					color: '#1A82e2',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [
				{
					name: 'ZohoPeopleOAuth2Api',
					required: true,
				},
			],
			properties: [
				{
					displayName: 'Resource',
					name: 'resource',
					noDataExpression: true,
					type: 'options',
					options: [
							{
									name: 'Forms',
									value: 'forms',
							},
					],
					default: 'forms',
					required: true,
					description: 'Resource to consume',
			},
			...formOperations,
			...formFields
		],
	};

	methods = {
		loadOptions: {

		}
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'forms') {

					if (operation === 'fetchForms') {
							// const qs: IDataObject = {};
							// const options = this.getNodeParameter('options', i) as GetAllFilterOptions;

							// addGetAllFilterOptions(qs, options);

							// responseData = await handleListing.call(this, 'GET', '/forms', {});
							responseData = await zohoApiRequest.call(this, 'GET', '/forms', {}, {});
					}
					if (operation === 'getBulkRecords') {
						const formLinkName = this.getNodeParameter('formLinkName', 0) as string;
						const sIndex = this.getNodeParameter('sIndex', 0) as number;
						const limit = this.getNodeParameter('limit', 0) as number;
						const endpoint = `/forms/${formLinkName}/getRecords?sIndex=${sIndex}&limit=${limit}`
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}

				throw error;
			}

			Array.isArray(responseData)
				? returnData.push(...responseData)
				: returnData.push(responseData);
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
