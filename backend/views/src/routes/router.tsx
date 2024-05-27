import { createHashRouter } from 'react-router-dom';
import Main from '../layout/Main';
import StockManager from '../pages/StockManager/StockManager';
import { __ } from '@wordpress/i18n';

const router = createHashRouter( [
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <div> { __('Dashboard Comming Soon', 'store-manager-for-woocommerce')}</div>,
			},
			{
				path: '/stock-manager',
				element: <StockManager />,
			},
			{
				path: '/badge-manager',
				element: <div>{ __('Badge Manager Comming Soon', 'store-manager-for-woocommerce')}</div>,
			},
			{
				path: '/customer-manager',
				element: <div> { __('Customer Manager Comming Soon', 'store-manager-for-woocommerce')}</div>,
			},
			{
				path: '/export-import',
				element: <div> { __('Export Import Comming Soon', 'store-manager-for-woocommerce')}</div>,
			},
			{
				path: '/analytics',
				element: <div> { __('Analytics Comming Soon', 'store-manager-for-woocommerce')}</div>,
			},
		],
	},
	{
		path: '*',
		element: <div> { __('Page Not Found', 'store-manager-for-woocommerce')}</div>,
	},
] );

export default router;
