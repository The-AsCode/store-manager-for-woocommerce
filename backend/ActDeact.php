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
        self::create_filter_table(); 
        self::create_badge_table();
    } 

    /**
     * Method to create database table
     * 
     * @return void
     */
    protected static function create_badge_table() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'store_manager_badges';
    
        $charset_collate = $wpdb->get_charset_collate();
    
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            badge_name varchar(255) NOT NULL,
            badge_type varchar(100) NOT NULL,
            filter text NOT NULL,
            badge_style text NOT NULL,
            priority tinyint(3) NOT NULL DEFAULT 1,
            status tinyint(3) NOT NULL DEFAULT 1,
            created_by mediumint(9) NOT NULL,
            valid_from datetime DEFAULT null,
            valid_to datetime DEFAULT null,
            created_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";
    
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        dbDelta($sql);
    } 
    
    /**
     * Method to create database table
     * 
     * @return void
     */
    protected static function create_filter_table() { 
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