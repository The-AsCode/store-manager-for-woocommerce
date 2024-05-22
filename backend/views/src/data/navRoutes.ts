type RouteKeys =
	| '/'
	| 'stock-manager'
	| 'badge-manager'
	| 'customer-manager'
	| 'export-import'
	| 'analytics';

type Routes = {
	[ key in RouteKeys ]: string;
};
const navRoutes: Routes = {
	'/': 'Dashboard',
	'stock-manager': 'Stock Manager',
	'badge-manager': 'Badge Manager',
	'customer-manager': 'Customer Manager',
	'export-import': 'Export / Import',
	analytics: 'Analytics',
} as const;

export default navRoutes;
