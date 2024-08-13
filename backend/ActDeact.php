<?php

namespace STORE_MANAGER\Backend;

/**
 * Activate and deactivate method of the plugin and relates.
 */
class ActDeact {
    
    /**
     * Constructor for the class
     */
    public function __construct() { 
        self::create_plugin_table(); 
    } 
    
    /**
     * Method to create database table
     * 
     * @return void
     */
    public static function create_plugin_table() { 
        global $wpdb;

        $table_name = $wpdb->prefix . 'store_manager_filters';

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            filter_name varchar(255) NOT NULL,
            filter_data text NOT NULL,
            created_by bigint(20) NOT NULL,
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        
        dbDelta( $sql );
    }
}