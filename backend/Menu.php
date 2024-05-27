<?php

namespace STORE_MANAGER\Backend;

/**
 * The menu handler class
 */
class Menu {

    public function __construct() {
        add_action('admin_menu', [$this, 'STORE_MANAGER_admin_menu']);
    }

    public function STORE_MANAGER_admin_menu() {
        add_menu_page(
            __('Manager X', 'store-manager'),
            __('Manager X', 'store-manager'),
            'manage_options',
            'store-manager',
            [$this, 'plugin_page'],
            'dashicons-welcome-widgets-menus' // Icon for the menu item
        );
    }

    /**
     * Callback function to display the plugin page.
     */
    public function plugin_page() {
        // Load the view from the plugin directory.
        require_once STORE_MANAGER_DIR_PATH . '/backend/views/admin-view.php';
    }
}