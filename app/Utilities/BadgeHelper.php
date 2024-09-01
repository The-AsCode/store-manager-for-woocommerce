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