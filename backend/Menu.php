<?php

namespace Shop_Manager_X\Backend;

/**
 * The menu handler class
 */
class Menu {

    public function __construct() {
        add_action('admin_menu', [$this, 'shop_manager_x_admin_menu']);
    }

    public function shop_manager_x_admin_menu() {
        add_menu_page(
            __('Manager X', 'shop-manager-x'),
            __('Manager X', 'shop-manager-x'),
            'manage_options',
            'shop-manager-x',
            [$this, 'plugin_page'],
            'dashicons-welcome-widgets-menus' // Icon for the menu item
        );
    }

    /**
     * Callback function to display the plugin page.
     */
    public function plugin_page() {
        // Load the view from the plugin directory.
        require_once SHOP_MANAGER_X_DIR_PATH . '/backend/views/admin-view.php';
    }
}