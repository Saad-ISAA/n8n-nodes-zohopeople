import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import { IDataObject, NodeApiError, NodeOperationError } from 'n8n-workflow';

import {
	GetAllFilterOptions,
	ZohoPeopleOAuth2ApiCredentials,
} from './types';

export async function zohoApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
) {
	const { oauthTokenData } = (await this.getCredentials(
		'ZohoPeopleOAuth2Api',
	)) as ZohoPeopleOAuth2ApiCredentials;

	const options: OptionsWithUri = {
		body: {
			data: [body],
		},
		method,
		qs,
		uri: uri ?? `https://people.zoho.com/people/api${endpoint}`,
		// uri: uri ?? `${oauthTokenData.api_domain}/people/api${endpoint}`,
		json: true,
	};

	if (!Object.keys(body).length) {
		delete options.body;
	}

	if (!Object.keys(qs).length) {
		delete options.qs;
	}
	console.log(options)
	try {
		const responseData = await this.helpers.requestOAuth2?.call(this, 'ZohoPeopleOAuth2Api', options);

		if (responseData === undefined) return [];

		throwOnErrorStatus.call(this, responseData);

		console.log(responseData)

		return responseData.response.result;
	} catch (error) {
		console.log(error)
		throw new NodeApiError(this.getNode(), error as any);
	}
}

export function throwOnErrorStatus(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	responseData: { data?: Array<{ status: string; message: string }> },
) {
	if (responseData?.data?.[0].status === 'error') {
		throw new NodeOperationError(this.getNode(), responseData as Error);
	}
}

/**
 * Make an authenticated API request to Zoho People API and return all items.
 */
 export async function zohoApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	const returnData: IDataObject[] = [];

	let responseData;
	qs.per_page = 200;
	qs.page = 1;

	do {
		responseData = await zohoApiRequest.call(this, method, endpoint, body, qs);
		console.log(responseData)
		if (Array.isArray(responseData) && !responseData.length) return returnData;
		returnData.push(...responseData);
		qs.page++;
	} while (responseData.info.more_records !== undefined && responseData.info.more_records === true);

	return returnData;
}

/**
 * Handle a Zoho People API listing by returning all items or up to a limit.
 */
 export async function handleListing(
	this: IExecuteFunctions,
	method: string,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	// const returnAll = this.getNodeParameter('returnAll', 0) as boolean;
	// const returnAll = false;

	// if (returnAll) {
	// 	return await zohoApiRequestAllItems.call(this, method, endpoint, body, qs);
	// }

	const responseData = await zohoApiRequest.call(this, method, endpoint, body, qs);
	// const limit = this.getNodeParameter('limit', 0) as number;
	// const limit = 0;
	console.log(responseData)
	return responseData;
}

/**
 * Add filter options to a query string object.
 */
 export const addGetAllFilterOptions = (qs: IDataObject, options: GetAllFilterOptions) => {
	if (Object.keys(options).length) {
		const { fields, ...rest } = options;
		Object.assign(qs, fields && { fields: fields.join(',') }, rest);
	}
};

export const capitalizeInitial = (str: string) => str[0].toUpperCase() + str.slice(1);
