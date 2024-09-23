<?php

/**
 * Ensure the file is not accessed directly.
 */
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Disco
 *
 * @package   Disco
 * @author    Ohidul Islam <wahid0003@gmail.com>
 * @link      http://domain.tld
 * @license   GPL 2.0+
 * @copyright 2022 WebAppick
 */

 use STORE_MANAGER\App\Badge;

 if ( !function_exists( 'apply_product_badges' ) ) {

	/**
	 * Get the discounted price of a product.
	 *
	 * @param float       $price Product Price.
	 * @param \WC_Product $product Product Object.
	 * @return float
	 */
	function apply_product_badges( $badge, $product ) {
		return ( new Badge )->apply_product_badges( $badge, $product );
	}

}


// Add text overlay on WooCommerce product image using woocommerce_product_get_image filter
function add_custom_text_to_product_image($image, $product) {
    // Make sure product object exists
    if ( ! $product ) {
        return $image;
    }

    // Apply the badge to the product
    $badge = apply_product_badges( $image, $product );

    if( empty( $badge ) ) {
        return $image;
    }

    return $badge;
}
add_filter('woocommerce_product_get_image', 'add_custom_text_to_product_image', 10, 2);

// add_action( 'woocommerce_before_shop_loop_item_title', 'add_custom_text_to_product_image' );
// add_filter('woocommerce_product_get_image', 'wish_me_add_icon_to_product_image', 10, 2);
// add_filter( 'woocommerce_cart_item_thumbnail', 'wish_me_add_icon_to_product_image', 10, 2 );
// add_filter('woocommerce_single_product_image_html', 'wish_me_add_icon_to_product_image', 10, 2);
add_filter('woocommerce_single_product_image_thumbnail_html', 'add_custom_text_to_product_image', 10, 2);
// add_filter('woocommerce_single_product_image_thumbnail_html', 'wish_me_add_icon_to_product_image', 10, 2);


