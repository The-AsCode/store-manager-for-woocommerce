<?php

/**
 * DropDown API
 *
 * @package    store-manager-for-woocommerce
 * @subpackage \Rest
 * @since      1.0.0
 * @category   Rest
 */

namespace STORE_MANAGER\Rest;

use STORE_MANAGER\App\Filter;
use WP_REST_Controller;
use WP_REST_Server;

class FilterApi extends WP_REST_Controller {

    /**
	 * FilterApi constructor.
	 */
	public function __construct() {
		$this->namespace = Api::NAMESPACE_NAME . '/' . Api::VERSION;
		$this->rest_base = Api::FILTER_ROUTE_NAME;
	}

    /**
	 * Registers the routes for the objects of the controller.
	 *
	 * @return void
	 */
	public function register_routes() { //phpcs:ignore

		register_rest_route(
			Api::NAMESPACE_NAME . '/' . Api::VERSION,
			'/' . Api::FILTER_ROUTE_NAME . '/',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'permissions_check' ),
					'args'                => $this->get_collection_params(),
				),
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'create_item' ),
					'permission_callback' => array( $this, 'permissions_check' ),
					'args'                => $this->get_endpoint_args_for_item_schema(),
				),
				'schema' => array( $this, 'get_item_schema' ),
			)
		);

		register_rest_route(
			Api::NAMESPACE_NAME . '/' . Api::VERSION,
			'/' . Api::FILTER_ROUTE_NAME . '/(?P<id>[\d]+)',
			array(
				'args'   => array(
					'id' => array(
						'description' => __( 'Unique identifier for the object.', 'store-manager-for-woocommerce' ),
						'type'        => 'integer',
					),
				),
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'permissions_check' ),
					'args'                => array(
						'context' => $this->get_context_param( array( 'default' => 'view' ) ),
					),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'permissions_check' ),
					'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::EDITABLE ),
				),
				array(
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => array( $this, 'delete_item' ),
					'permission_callback' => array( $this, 'permissions_check' ),
				),
				'schema' => array( $this, 'get_item_schema' ),
			)
		);
	}

	/**
	 * Creates one item from the collection.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function create_item( $request ) {
		$config = (array) $this->prepare_item_for_database( $request );

		if ( empty( $config ) ) {
			return new \WP_Error(
				'rest_not_added',
				__( 'Sorry, the filter could not be created with empty value.', 'store-manager-for-woocommerce' ),
				array( 'status' => 400 )
			);
		}

		$config   = (array) $config;
		$filter = ( new Filter )->save_filter( $config );

		return $filter;

		// if ( is_wp_error( $filter ) ) {
		// 	$filter->add_data( array( 'status' => 400 ) );

		// 	return $filter;
		// }

		// $response = $this->prepare_item_for_response( $filter, $request );

		// $response->set_status( 201 );
		// $campaign_id = 0;

		// if ( isset( $filter->id ) ) {
		// 	$campaign_id = $filter->id;
		// }

		// $response->header( 'Location', rest_url( sprintf( '%s/%s/%d', $this->namespace, $this->rest_base, $campaign_id ) ) );

		// return rest_ensure_response( $response );
	}



    /**
	 * Checks if a given request has access to read filters.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return bool|\WP_Error
	 */
	public function permissions_check( $request ) { //phpcs:ignore
		$permission = current_user_can( 'manage_options' );

		if ( ! $permission ) {
			return new \WP_Error(
				'rest_not_found',
				__( 'Sorry, Permission Denied.', 'store-manager-for-woocommerce' ),
				array( 'status' => 400 )
			);
		}

		// if ( isset( $request['id'] ) ) {
		// 	$filter = $this->get_campaign( absint( $request['id'] ) );

		// 	if ( is_wp_error( $filter ) ) {
		// 		return $filter;
		// 	}
		// }

		return $permission;
	}

	/**
	 * Prepares one item for create or update operation.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return object
	 */
	protected function prepare_item_for_database( $request ) {
		$valid_keys = array(
			'name',
			'products',
			'conditions'
		);

		$prepared = array();

		foreach ( $valid_keys as $key ) {
			if ( ! isset( $request[ $key ] ) ) {
				continue;
			}

			$prepared[ $key ] = $request[ $key ];
		}

		return (object) $prepared;
	}

	/**
	 * Prepares links for the request.
	 *
	 * @param object $item Item object.
	 * @return array Links for the given post.
	 */
	protected function prepare_links( $item ) {
		$id = 0;

		if ( isset( $item->id ) ) {
			$id = $item->id;
		}

		$base = sprintf( '%s/%s', $this->namespace, $this->rest_base );

		return array(
			'self'       => array(
				'href' => rest_url( trailingslashit( $base ) . $id ),
			),
			'collection' => array(
				'href' => rest_url( $base ),
			),
		);
	}

}