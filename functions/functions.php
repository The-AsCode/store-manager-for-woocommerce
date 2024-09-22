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
    $badge = apply_product_badges( '', $product );

    // If badge is available, add it as an overlay
    if ( ! empty( $badge ) ) {
        // Customize the style of the badge overlay
        $badge_overlay = '<div class="custom-overlay" style="position: absolute; top: 10px; left: 10px; background: rgba(255, 0, 0, 0.5); color: white; padding: 5px; z-index: 10;">' . esc_html( $badge ) . '</div>';
    } else {
        $badge_overlay = '';  // No badge, no overlay
    }

    // Wrap the original image with a div and append the badge overlay
    $new_image = '<div class="custom-image-wrapper" style="position: relative; display: inline-block;">' .
                 $image . 
                 $badge_overlay .  // Add the badge overlay if exists
                 '</div>';

    return $new_image;
}
add_filter('woocommerce_product_get_image', 'add_custom_text_to_product_image', 10, 2);

// add_action( 'woocommerce_before_shop_loop_item_title', 'add_custom_text_to_product_image' );
// add_filter('woocommerce_product_get_image', 'wish_me_add_icon_to_product_image', 10, 2);
// add_filter( 'woocommerce_cart_item_thumbnail', 'wish_me_add_icon_to_product_image', 10, 2 );
// add_filter('woocommerce_single_product_image_html', 'wish_me_add_icon_to_product_image', 10, 2);
add_filter('woocommerce_single_product_image_thumbnail_html', 'add_custom_text_to_product_image', 10, 2);
// add_filter('woocommerce_single_product_image_thumbnail_html', 'wish_me_add_icon_to_product_image', 10, 2);


