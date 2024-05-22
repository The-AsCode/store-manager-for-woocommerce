import { createHashRouter } from 'react-router-dom';
import Main from '../layout/Main';
import StockManager from '../pages/StockManager/StockManager';

const router = createHashRouter( [
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <div>Dashboard</div>,
			},
			{
				path: '/stock-manager',
				element: <StockManager />,
			},
			{
				path: '/badge-manager',
				element: <div>Badge Manager</div>,
			},
			{
				path: '/customer-manager',
				element: <div>Customer Manager</div>,
			},
			{
				path: '/export-import',
				element: <div>Export Import</div>,
			},
			{
				path: '/analytics',
				element: <div>Analytics</div>,
			},
		],
	},
	{
		path: '*',
		element: <div>Page Not Found</div>,
	},
] );

export default router;
