import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
declare const WMX: { rest_nonce: string; rest_url: string };

export const apiSlice = createApi( {
	baseQuery: fetchBaseQuery( {
		baseUrl: WMX.rest_url,
		prepareHeaders: ( headers ) => {
			return headers.set( 'X-WP-Nonce', WMX.rest_nonce );
		},
	} ),
	tagTypes: [ 'Products', 'ProductCount' ],
	endpoints: () => ( {} ),
} );
