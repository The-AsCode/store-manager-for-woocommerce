<?php

/**
 * Ensure the file is not accessed directly.
 */
if (!defined('ABSPATH')) {
    exit;
}


// Add text overlay on WooCommerce product image using woocommerce_product_get_image filter
function add_text_overlay_to_product_image_html($image, $product, $size, $attr, $placeholder) {
    // Custom overlay text
    $overlay_text = 'Special Offer';

    // Wrap the original image with a div and add overlay text
    $custom_html = '<div class="custom-image-overlay">';
    $custom_html .= $image; // Original image HTML
    $custom_html .= '<span class="overlay-text">' . esc_html($overlay_text) . '</span>';
    $custom_html .= '</div>';

    return $custom_html;
}
// add_action( 'woocommerce_before_shop_loop_item_title', 'wish_me_add_icon_to_product_image' );
// add_filter('woocommerce_product_get_image', 'wish_me_add_icon_to_product_image', 10, 2);
//	add_filter( 'woocommerce_cart_item_thumbnail', 'wish_me_add_icon_to_product_image', 10, 2 );
// add_filter('woocommerce_single_product_image_html', 'wish_me_add_icon_to_product_image', 10, 2);
// add_filter('woocommerce_single_product_image_thumbnail_html', 'wish_me_add_icon_to_product_image', 10, 2);
// add_filter('woocommerce_single_product_image_thumbnail_html', 'wish_me_add_icon_to_product_image', 10, 2);


