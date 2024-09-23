<?php

namespace STORE_MANAGER\App;
use STORE_MANAGER\App\Utilities\BadgeHelper;

class Badge {
    
    public function apply_product_badges( $badge, $product ) {
        if ( $product instanceof \WC_Product ) {
            $badge_config = BadgeHelper::get_badge(48);
            
            if( ! self::is_product_passed( $product, $badge_config ) ) {
                return false;
            }

            if( ! self::is_in_valid_date( $badge_config ) ) {
                return false;
            }

            return self::apply_badge_style( $badge, $badge_config );
        }
    }

    public static function apply_badge_style( $badge, $badge_config ) {
        // Customize the style of the badge overlay
        $badge_overlay = '<div class="custom-overlay" style="position: absolute; top: 10px; left: 10px; background: rgba(255, 0, 0, 0.5); color: white; padding: 5px; z-index: 10;">'. $badge_config['badge_style'] . '</div>';

        // Wrap the original image with a div and append the badge overlay
        $new_image = $badge . $badge_overlay;

        return $new_image;
    }

    public static function is_product_passed( $product, $badge_config ){

        $filter = $badge_config['filter'];

        if( $filter == 'all' ) {
            return true;
        }

        if( is_numeric( $filter ) ) {
            //@todo: do filter action.
        }

        if ( is_array( $filter ) ) {
            foreach ( $filter as $filter_product ) {
                if ( is_array( $filter_product ) && ( $product->get_id() == $filter_product['id'] ) ) {
                    return true;
                }
            }
        }
    }

    public static function is_in_valid_date( $badge_config ) {
        if ( empty( $badge_config['valid_from'] ) && empty( $badge_config['valid_to'] ) ) {
            return true;
        }

        if ( isset( $badge_config['valid_from'] ) && strtotime( $badge_config['valid_from'] )) {
            $today      = gmdate( 'Y-m-d H:i:s' );
            $start_date = gmdate( 'Y-m-d H:i:s', strtotime( $badge_config['valid_from'] ) );

            return ( $today >= $start_date );
        }

        if ( isset( $badge_config['valid_from'], $badge_config['valid_to'] )
            && strtotime( $badge_config['valid_from'] )
            && strtotime( $badge_config['valid_to'] )
        ) {
            $today      = gmdate( 'Y-m-d H:i:s' );
            $start_date = gmdate( 'Y-m-d H:i:s', strtotime( $badge_config['valid_from'] ) );
            $end_date   = gmdate( 'Y-m-d H:i:s', strtotime( $badge_config['valid_to'] ) );

            return ( $today >= $start_date ) && ( $today <= $end_date );
        }

        return false;
    }

}