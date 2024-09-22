<?php

namespace STORE_MANAGER\App;
use STORE_MANAGER\App\Utilities\BadgeHelper;

class Badge {
    
    public function apply_product_badges($badge, $product ) {
        if ( $product instanceof \WC_Product ) {
            return $this->is_product_passed( $product, $badge );
        }
    }

    public function is_product_passed( $product, $badge ){
        $badge = BadgeHelper::get_badge(49);

        $filter = $badge['filter'];

        if( $filter == 'all' ) {
            return $badge['badge_style'];
        }

        if( is_numeric( $filter ) ) {
            //@todo: do filter action.
        }

        if ( is_array( $filter ) ) {
            foreach ( $filter as $filter_product ) {
                if ( is_array( $filter_product ) && ( $product->get_id() == $filter_product['id'] ) ) {
                    return $badge['badge_style'];
                }
            }
        }
    }

    public function is_valid_date() {
        
    }

}