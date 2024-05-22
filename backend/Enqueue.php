<?php

namespace Shop_Manager_X\Backend;

class Enqueue {

    public function __construct() {
        add_action('admin_enqueue_scripts', [$this, 'admin_script'], 10, 1);
    }

    /**
     * Enqueue styles and scripts on the admin dashboard.
     *
     * @param string $page The current admin page.
     * @return void
     */
    public function admin_script( $page ) {

        // // Enqueue the CSS file.
        // wp_enqueue_style('ascode-woo-calculator-css', SHOP_MANAGER_X_ASSETS . '/admin/css/output.css');

        // Check if the current admin page matches your target page.
        if ( $page === 'toplevel_page_shop-manager-x' ) {
            // Enqueue the JavaScript file.
            wp_enqueue_script('shop-manager-x-dashboard', SHOP_MANAGER_X_ASSETS . '/build/plugin-admin.js', [], false, true);

        }
    }
}