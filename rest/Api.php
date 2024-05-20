<?php

namespace Shop_Manager_X\Rest;


/**
 * Class Api
 *
 * @package Woo_Manager_X\Rest
 */
Class Api {

    public function __construct() {
        add_action( 'rest_api_init', array( $this, 'register_rest_api' ) );
    }

    public const NAMESPACE_NAME      = 'wmx';
	public const VERSION             = 'v1';
	public const PRODUCTS_COUNT_ROUTE_NAME = 'product-count';
	public const PRODUCT_CATEGORY_ROUTE_NAME = 'product-category';
	public const PRODUCT_TYPE_ROUTE_NAME = 'product-type';
	public const PRODUCT_ROUTE_NAME = 'product';

    /**
	 * Register REST API
	 *
	 * @return void
	 */
	public function register_rest_api() {

		//wp-json/wmx/v1/product-count
		$products_count = new ProductsCountApi;
		$products_count->register_route();

		//wp-json/wmx/v1/product-category
		$product_category = new ProductCategoryApi;
		$product_category->register_route();

		//wp-json/wmx/v1/product-type
		$product_type = new ProductTypeApi;
		$product_type->register_routes();

		//wp-json/wmx/v1/product?per_page=20&category=slug&type=type&page=1&search=product_name&status=all/managed/out_of_stock/low_stock
		//wp-json/wmx/v1/product/product_id?manage_stock=yes/no&stock_quantity=20&stock_status=instock/outofstock/onbackorder&backorders=yes/no/notify
		$product = new ProductApi;
		$product->register_route();
	}
}