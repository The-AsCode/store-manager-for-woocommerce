<?php

/**
 * Ensure the file is not accessed directly.
 */
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Badge
 *
 * @package   Store Managet
 * @author    ShopManagerX
 * @link      http://domain.tld
 * @license   GPL 2.0+
 * @copyright 2024 ShopManagerX
 */

 use STORE_MANAGER\App\Badge;

 if ( !function_exists( 'store_manager_apply_product_badges' ) ) {

	/**
	 * Apply badge in a product.
	 *
	 * @param $badge Product badge
     * @param $product product object
     * 
     * @return html
	 */
	function store_manager_apply_product_badges( $badge, $product ) {
		return ( new Badge )->apply_product_badges( $badge, $product );
	}

}


if( !function_exists( 'store_manager_add_badge_to_product_image' ) ){
    // Add text overlay on WooCommerce product image using woocommerce_product_get_image filter
    function store_manager_add_badge_to_product_image($image, $product) {
        // Make sure product object exists
        if ( ! $product ) {
            return $image;
        }

        // Apply the badge to the product
        $badge = store_manager_apply_product_badges( $image, $product );

        if( empty( $badge ) ) {
            return $image;
        }

        return $badge;
    }

    add_filter('woocommerce_product_get_image', 'store_manager_add_badge_to_product_image', 10, 2);
}

// add_action( 'woocommerce_before_shop_loop_item_title', 'add_custom_text_to_product_image' );
// add_filter('woocommerce_product_get_image', 'wish_me_add_icon_to_product_image', 10, 2);
// add_filter( 'woocommerce_cart_item_thumbnail', 'wish_me_add_icon_to_product_image', 10, 2 );
// add_filter('woocommerce_single_product_image_html', 'wish_me_add_icon_to_product_image', 10, 2);
// add_filter('woocommerce_single_product_image_thumbnail_html', 'store_manager_add_badge_to_product_image_single', 10, 2);
// add_filter('woocommerce_single_product_image_thumbnail_html', 'wish_me_add_icon_to_product_image', 10, 2);
