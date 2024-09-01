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
    public static function save_badge($badge_data) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'store_manager_badges';
    
        // Ensure 'created_by' is set to the current user ID
        $badge_data['created_by'] = get_current_user_id();
        
        // Insert the badge data into the database
        $inserted = $wpdb->insert($table_name, $badge_data);
    
        // Check if the insert was successful
        if (false === $inserted) {
            return new \WP_Error(
                'rest_not_added',
                __('Sorry, the badge could not be added.', 'store-manager-for-woocommerce'),
                array('status' => 400)
            );
        }
    
        // Return the ID of the inserted row
        return $wpdb->insert_id;
    }    

    /**
     * Get badge
     * 
     * @param array $badge_data
     * 
     * @return int
     */
    public static function get_badge( $badge_id ) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'store_manager_badges';
        
        // Prepare and execute the query to get the specific badge
        $query = $wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $badge_id);
        $result = $wpdb->get_row($query, ARRAY_A); // ARRAY_A returns an associative array
        
        if (empty($result)) {
            return new \WP_Error(
                'rest_no_badge',
                __( 'Badge not found.', 'store-manager-for-woocommerce' ),
                array( 'status' => 404 )
            );
        }
        
        // Decode JSON fields
        if (!empty($result['badge_data'])) {
            $result['badge_data'] = json_decode($result['badge_data'], true); // true for associative array
        }
        if (!empty($result['badge_style'])) {
            $result['badge_style'] = json_decode($result['badge_style'], true); // true for associative array
        }
        
        return $result;
        
    }

    /**
     * Update badge
     * 
     * @param int   $badge_id   ID of the badge to update
     * @param array $badge_data Associative array of badge data to update
     * 
     * @return mixed Updated badge ID on success, WP_Error on failure
     */
    public static function update_badge($badge_id, $badge_data) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'store_manager_badges';
        
        // Prepare and execute the query to update the specific badge
        $where = array('id' => $badge_id);
        $updated = $wpdb->update($table_name, $badge_data, $where);
        
        if (false === $updated) {
            return new \WP_Error(
                'rest_not_updated',
                __('Sorry, the badge could not be updated.', 'store-manager-for-woocommerce'),
                array('status' => 400)
            );
        }
        
        // Return the ID of the updated badge
        return $badge_id;
    }
}