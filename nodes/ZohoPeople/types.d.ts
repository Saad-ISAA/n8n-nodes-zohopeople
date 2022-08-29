import { IDataObject } from 'n8n-workflow';

// ----------------------------------------
//          for generic functions
// ----------------------------------------

type Resource =
	| 'forms';

export type CamelCaseResource = Resource | 'form';

export type SnakeCaseResource = Resource;

export type GetAllFilterOptions = {
	fields: string[];
	[otherOptions: string]: unknown;
};

// ----------------------------------------
//               for auth
// ----------------------------------------

export type ZohoPeopleOAuth2ApiCredentials = {
	oauthTokenData: {
		api_domain: string;
	};
};

// ----------------------------------------
//         for field adjusters
// ----------------------------------------

export type IdType = 'accountId' | 'contactId' | 'dealId' | 'purchaseOrderId';

export type NameType = 'formLinkName';
