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
        
        if ( empty($results ) ) {
            return new \WP_Error(
                'rest_no_badges',
                __( 'No badges found.', 'store-manager-for-woocommerce' ),
                array( 'status' => 404 )
            );
        }
        
        // Decode JSON fields
        foreach ($results as &$badge) {
            if ( ! empty( $badge['filter'] ) ) {
                $badge['filter'] = maybe_unserialize($badge['filter'], true); // true for associative array
            }
            if ( ! empty($badge['badge_style'] ) ) {
                $badge['badge_style'] = maybe_unserialize($badge['badge_style'], true); // true for associative array
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
    
        // Get the highest priority from the table
        $highest_priority = $wpdb->get_var( "SELECT MAX(priority) FROM $table_name" );
        
        $badge_data['priority'] = $highest_priority ? $highest_priority + 1 : 1;
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
        if (!empty($result['filter'])) {
            $result['filter'] = maybe_unserialize($result['filter'], true); // true for associative array
        }
        if (!empty($result['badge_style'])) {
            $result['badge_style'] = maybe_unserialize($result['badge_style'], true); // true for associative array
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

    /**
     * Delete badge
     * 
     * @param int $badge_id ID of the badge to delete
     * 
     * @return mixed Array of deleted badge data on success, WP_Error on failure
     */
    public static function delete_badge($badge_id) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'store_manager_badges';

        // Ensure the badge ID is valid
        if ( ! is_numeric( $badge_id ) || $badge_id <= 0 ) {
            return new \WP_Error(
                'rest_invalid_id',
                __('Invalid badge ID.', 'store-manager-for-woocommerce'),
                array('status' => 400)
            );
        }

        // Retrieve the badge data before deletion
        $previous = self::get_badge($badge_id);

        if ( empty( $previous ) ) {
            return new \WP_Error(
                'rest_not_found',
                __('Badge not found.', 'store-manager-for-woocommerce'),
                array('status' => 404)
            );
        }

        // Prepare and execute the query to delete the specific badge
        $where = array('id' => $badge_id);
        $deleted = $wpdb->delete($table_name, $where);

        if ( false === $deleted ) {
            return new \WP_Error(
                'rest_not_deleted',
                __('Sorry, the badge could not be deleted.', 'store-manager-for-woocommerce'),
                array('status' => 400)
            );
        }

        // Return the deleted badge data
        return $previous;
    }

    public static function get_badges_for_apply( $status = null, $badge_type = null ) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'store_manager_badges';
        
        // Build the query dynamically based on status and badge type
        $query = "SELECT * FROM $table_name WHERE 1=1";
        
        // Add condition for status if provided
        if ( ! is_null( $status ) ) {
            $query .= $wpdb->prepare( " AND status = %s", $status );
        }
        
        // Add condition for badge type if provided
        if ( ! is_null( $badge_type ) ) {
            $query .= $wpdb->prepare( " AND badge_type = %s", $badge_type );
        }
        
        // Add order by priority in ascending order
        $query .= " ORDER BY priority DESC";
        
        // Execute the query
        $results = $wpdb->get_results( $query, ARRAY_A ); // ARRAY_A returns an associative array
        
        if ( empty( $results ) ) {
            // Return an empty array if no results found
            return [];
        }
        
        // Decode JSON fields
        foreach ( $results as &$badge ) {
            if ( ! empty( $badge['filter'] ) ) {
                $badge['filter'] = maybe_unserialize( $badge['filter'], true ); // true for associative array
            }
            if ( ! empty( $badge['badge_style'] ) ) {
                $badge['badge_style'] = maybe_unserialize( $badge['badge_style'], true ); // true for associative array
            }
        }
        
        return $results;
    }    

}