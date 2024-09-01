<?php
/**
 * BadgeHelper Utility
 *
 * @package    Store Manager
 * @subpackage App\Utility
 * @since      1.0.0
 * @category   Utility
 */

namespace STORE_MANAGER\App\Utilities;

class BadgeHelper {

    public static function get_badges(){
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'store_manager_badges';
        
        $query = "SELECT * FROM $table_name";
        $results = $wpdb->get_results($query, ARRAY_A); // ARRAY_A returns an associative array
        
        if (empty($results)) {
            return new \WP_Error(
                'rest_no_badges',
                __( 'No badges found.', 'store-manager-for-woocommerce' ),
                array( 'status' => 404 )
            );
        }
        
        // Decode JSON fields
        foreach ($results as &$badge) {
            if (!empty($badge['badge_data'])) {
                $badge['badge_data'] = json_decode($badge['badge_data'], true); // true for associative array
            }
            if (!empty($badge['badge_style'])) {
                $badge['badge_style'] = json_decode($badge['badge_style'], true); // true for associative array
            }
        }
        
        return $results;
    }        
    
    /**
     * Save badge
     * 
     * @param array $badge_data
     * 
     * @return int
     */
    public static function save_badge( $badge_data ) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'store_manager_badges';

        $badge_data['created_by'] = get_current_user_id();
        
        $result = $wpdb->insert($table_name, $badge_data);

        if( empty( $result ) ) {
            return new \WP_Error(
				'rest_not_added',
				__( 'Sorry, the badge could not be added.', 'store-manager-for-woocommerce' ),
				array( 'status' => 400 )
			);
        }

        return $result;
    }
}