<?php

/** 
 * Plugin Name:       Store Manager For WooCommerce
 * Plugin URI:        https://osmanhaideradnan.wordpress.com/
 * Description:       A Plugin for manage WooCommerce shop.
 * Version:           1.1.5
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            Osman Haider Adnan
 * Author URI:        https://osmanhaideradnan.wordpress.com/
 * Text Domain:       store-manager-for-woocommerce-for-woocommerce
 * Domain Path:       /languages
 * @package     AsCode Woo Calculator
 * @author      Adnan <osmanhaider159@gmail.com>
 * @copyright   Copyright (C) 2023 Osman Haider Adnan. All rights reserved.
 * @license     GPLv3 or later
 * @since       1.0.0
 */

// Ensure the file is not accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

// Check if the Composer autoload file exists, and if not, show an error message.
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    die('Please run `composer install` in the main plugin directory.');
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Plugin main class
 */
final class STORE_MANAGER
{

    /**
     * Define plugin version
     * 
     * @var string
     */
    const version = '1.0.0';

    // Private constructor to enforce singleton pattern.
    private function __construct()
    {
        $this->define_constants();

        // Register activation hook.
        register_activation_hook(__FILE__, [$this, 'activate']);

        // Hook into the 'plugins_loaded' action to initialize the plugin.
        add_action('plugins_loaded', [$this, 'init_plugin']);
    }

    /**
     * Singleton instance
     *
     * @return shop_manager
     */
    public static function init()
    {
        static $instance = false;

        if (!$instance) {
            $instance = new self();
        }

        return $instance;
    }

    /**
     * Define constants for the plugin.
     *
     * @return void
     */
    function define_constants()
    {
        define('STORE_MANAGER_VERSION', self::version);
        define('STORE_MANAGER_FILE', __FILE__);
        define('STORE_MANAGER_DIR_PATH', plugin_dir_path(STORE_MANAGER_FILE));
        define('STORE_MANAGER_URL', plugin_dir_url(STORE_MANAGER_FILE));
        define('STORE_MANAGER_ASSETS', STORE_MANAGER_URL . 'assets');
    }

    /**
     * Do stuff upon plugin activation
     *
     * @return void
     */
    function activate()
    {
        // Set an option to store the installation time.
        $installed = get_option('shop_manager_install_time_x');

        if (!$installed) {
            update_option('STORE_MANAGER_install_time', time());
        }
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin() {
        if (is_admin()) {
            new STORE_MANAGER\Backend\Menu();
        }

        new STORE_MANAGER\Rest\Api();

        new STORE_MANAGER\Backend\Enqueue();
    }
}

/**
 * Initialize the main plugin.
 *
 * @return shop_manager
 */
function STORE_MANAGER()
{
    return STORE_MANAGER::init();
}

// Kick-off the plugin.
STORE_MANAGER();