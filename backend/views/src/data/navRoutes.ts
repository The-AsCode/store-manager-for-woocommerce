import { __ } from '@wordpress/i18n';

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
	'/':  __('Dashboard', 'store-manager-for-woocommerce'),
	'stock-manager': __('Stock Manager','store-manager-for-woocommerce'),
	'badge-manager': __('Badge Manager','store-manager-for-woocommerce'),
	'customer-manager': __('Customer Manager','store-manager-for-woocommerce'),
	'export-import': __('Export / Import', 'store-manager-for-woocommerce'),
	analytics: __('Analytics','store-manager-for-woocommerce'),
} as const;

export default navRoutes;
