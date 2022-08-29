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
import { attendanceFields, attendanceOperations } from './descriptions/AttendanceDescription';
import { casesFields, casesOperations } from './descriptions/CasesDescription';
import { viewFields, viewOperations } from './descriptions/ViewDescription';
import { leaveFields, leaveOperations } from './descriptions/LeaveDescription';

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
						{
							name: 'Attendance',
							value: 'attendance',
						},
						{
							name: 'Cases',
							value: 'cases',
						},
						{
							name: 'Leave',
							value: 'leave',
						},
						{
							name: 'View',
							value: 'view',
						},
					],
					default: 'forms',
					required: true,
					description: 'Resource to consume',
			},
			...formOperations,
			...formFields,
			...attendanceOperations,
			...attendanceFields,
			...casesOperations,
			...casesFields,
			...viewOperations,
			...viewFields,
			...leaveOperations,
			...leaveFields
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
					if (operation === 'getRecordCount') {
						const formLinkName = this.getNodeParameter('formLinkName', 0) as string;
						const endpoint = `/forms/${formLinkName}/getRecordCount`
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}

				}
				else if (resource === 'attendance') {

					if (operation === 'fetchLastAttendanceEntries') {
						const duration = this.getNodeParameter('duration', 0) as number;
						const dateTimeFormat = this.getNodeParameter('dateTimeFormat', 0) as string;
						const endpoint = `/attendance/fetchLatestAttEntries?duration=${duration}&dateTimeFormat=${dateTimeFormat}`
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}
					if (operation === 'shiftDetailsOfEmployee') {
						const mapId = this.getNodeParameter('mapId', 0) as string;
						const emailId = this.getNodeParameter('emailId', 0) as string;
						const empId = this.getNodeParameter('empId', 0) as string;
						const sdate = this.getNodeParameter('sdate', 0) as string;
						const edate = this.getNodeParameter('edate', 0) as string;

						const endpoint = `/attendance/getShiftConfiguration?empId=${empId}&sdate=${sdate}&edate=${edate}`
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}
				}
				else if (resource === 'cases') {

					if (operation === 'listCategory') {
						const endpoint = '/hrcases/listCategory'
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}
					if (operation === 'viewcase') {
						const recordId = this.getNodeParameter('recordId', 0) as string;

						const endpoint = `/hrcases/viewcase?recordId=${recordId}`
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}
				}
				else if (resource === 'view') {

					if (operation === 'defaultAndCustomView') {
						const endpoint = '/views'
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}
					if (operation === 'fetchViewOfSpecificForm') {
						const formLinkName = this.getNodeParameter('formLinkName', 0) as string;

						const endpoint = `/forms/${formLinkName}/views`
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}
				}
				else if (resource === 'leave') {

					if (operation === 'getLeaveTypes') {
						const userId = this.getNodeParameter('userId', 0) as string;

						const endpoint = `/leave/getLeaveTypeDetails?userId=${userId}`
						responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
					}
					if (operation === 'getHolidays') {
						const userId = this.getNodeParameter('userId', 0) as string;

						const endpoint = `/leave/getLeaveTypeDetails?userId=${userId}`
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
