<?php

/**
 * Badge API
 *
 * @package    store-manager-for-woocommerce
 * @subpackage \Rest
 * @since      1.0.0
 * @category   Rest
 */

namespace STORE_MANAGER\Rest;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Server;
use STORE_MANAGER\App\Utilities\BadgeHelper;

class BadgeApi extends WP_REST_Controller {

    /**
     * Filter api constractor
     */
    public function __construct() {
		$this->namespace = Api::NAMESPACE_NAME . '/' . Api::VERSION;
		$this->rest_base = Api::BADGE_ROUTE_NAME;
	}

    /**
	 * Registers the routes for the objects of the controller.
	 *
	 * @return void
	 */
	public function register_routes() { //phpcs:ignore

		register_rest_route(
			Api::NAMESPACE_NAME . '/' . Api::VERSION,
			'/' . Api::BADGE_ROUTE_NAME . '/',
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
					'args'                => $this->get_collection_params(),
				),
				'schema' => array( $this, 'get_item_schema' ),
			)
		);

		register_rest_route(
			Api::NAMESPACE_NAME . '/' . Api::VERSION,
			'/' . Api::BADGE_ROUTE_NAME . '/(?P<id>[\d]+)',
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
	 * Retrieves a list of badge items.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_REST_Response|\WP_Error
	 */
    public function get_items( $request ) {
        $badges = BadgeHelper::get_badges();

        if( empty( $badges ) ) {
            return array();
        }

        $response_badge = array();
        foreach( $badges as $badge ) {
            $response_badge[] = $this->prepare_item_for_response( $badge, $request );
        }

        return $response_badge;
    }

    /**
	 * Create a item for badge.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_REST_Response|\WP_Error
	 */
    public function create_item( $request ) {
        $badge_data = $this->prepare_item_for_database( $request );
        $inserted_id = BadgeHelper::save_badge( $badge_data );
        return $inserted_id;
    }

    /**
	 * Checks if a given request has access to read badge.
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

		return $permission;
	}

    /**
     * Check permissions for the posts.
     *
     * @param \WP_REST_Request $request
     *
     * @return bool|\WP_Error
     */
    public function products_permissions_check( $request ) {
        return current_user_can( 'manage_options');
    }

    /**
     * Get the query params for collections.
     *
     * @return array
     */
    public function get_collection_params() {
        return array(
            'badge_name' => array(
                'description'       => __( 'Badge name', 'store-manager-for-woocommerce' ),
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => 'rest_validate_request_arg',
            ),
            'badge_type' => array(
                'description'       => __( 'Badge type', 'store-manager-for-woocommerce' ),
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => 'rest_validate_request_arg',
            ),
            'badge_data' => array(
                'description'       => __( 'Badge data', 'store-manager-for-woocommerce' ),
                'type'              => 'object',
                // 'sanitize_callback' => 'sanitize_text_field',
                // 'validate_callback' => 'rest_validate_request_arg',
            ),
            'badge_style' => array(
                'description'       => __( 'Badge Style data', 'store-manager-for-woocommerce' ),
                'type'              => 'object',
                // 'sanitize_callback' => 'sanitize_text_field',
                // 'validate_callback' => 'rest_validate_request_arg',
            ),
            'priority' => array(
                'description'       => __( 'Badge priority', 'store-manager-for-woocommerce' ),
                'type'              => 'integer',
                'sanitize_callback' => 'absint',
                'validate_callback' => 'rest_validate_request_arg',
            ),
            'status' => array(
                'description'       => __( 'Badge status', 'store-manager-for-woocommerce' ),
                'type'              => 'integer',
                'sanitize_callback' => 'absint',
                'validate_callback' => 'rest_validate_request_arg',
            ),
            'filter_id' => array(
                'description'       => __( 'Filter id', 'store-manager-for-woocommerce' ),
                'type'              => 'integer',
                'sanitize_callback' => 'absint',
                'validate_callback' => 'rest_validate_request_arg',
            )
        );
    }

    /**
     * Get the Product schema, conforming to JSON Schema.
     *
     * @return array
     */
    public function get_item_schema() {
        return array(
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => 'badge',
            'type'       => 'object',
            'properties' => array(
                'id'   => array(
                    'description' => __( 'Unique identifier for the object.', 'store-manager-for-woocommerce' ),
                    'type'        => 'integer',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'name' => array(
                    'description' => __( 'Badge name.', 'store-manager-for-woocommerce' ),
                    'type'        => 'string',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'badge_type' => array(
                    'description' => __( 'Badge type.', 'store-manager-for-woocommerce' ),
                    'type'        => 'string',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'badge_data' => array(
                    'description' => __( 'Badge data.', 'store-manager-for-woocommerce' ),
                    'type'        => 'object',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'badge_style' => array(
                    'description' => __( 'Badge Style.', 'store-manager-for-woocommerce' ),
                    'type'        => 'object',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'priority' => array(
                    'description' => __( 'Badge priority.', 'store-manager-for-woocommerce' ),
                    'type'        => 'integer',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'status' => array(
                    'description' => __( 'Badge status.', 'store-manager-for-woocommerce' ),
                    'type'        => 'integer',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'filter_id' => array(
                    'description' => __( 'Filter id.', 'store-manager-for-woocommerce' ),
                    'type'        => 'integer',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'created_by' => array(
                    'description' => __( 'Badge created by.', 'store-manager-for-woocommerce' ),
                    'type'        => 'integer',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'created_date' => array(
                    'description' => __( 'Badge created date.', 'store-manager-for-woocommerce' ),
                    'type'        => 'date',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
                'updated_date' => array(
                    'description' => __( 'Badge update date.', 'store-manager-for-woocommerce' ),
                    'type'        => 'date',
                    'context'     => array( 'view' ),
                    'readonly'    => true,
                ),
            ),
        );
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

    /**
	 * Prepares item for database.
	 *
	 * @param object $item Item object.
	 * @return array Links for the given post.
	 */
    protected function prepare_item_for_database( $request ) {

        // Validate and sanitize the badge_name
        if ( empty( $request['badge_name'] ) ) {
            return new WP_Error( 'missing_badge_name', __( 'Badge name is required.', 'store-manager-for-woocommerce' ), array( 'status' => 400 ) );
        }
        $badge_name = sanitize_text_field( $request['badge_name'] );

        // Validate and sanitize the badge_type
        if ( empty( $request['badge_type'] ) ) {
            return new WP_Error( 'missing_badge_type', __( 'Badge type is required.', 'store-manager-for-woocommerce' ), array( 'status' => 400 ) );
        }
        $badge_type = sanitize_text_field( $request['badge_type'] );

        // Validate and sanitize the priority
        if ( ! isset( $request['priority'] ) || ! is_numeric( $request['priority'] ) ) {
            return new WP_Error( 'invalid_priority', __( 'Priority must be a valid number.', 'store-manager-for-woocommerce' ), array( 'status' => 400 ) );
        }
        $priority = absint( $request['priority'] );

        // Validate and sanitize the status
        if ( ! isset( $request['status'] ) || ! is_numeric( $request['status'] ) ) {
            return new WP_Error( 'invalid_status', __( 'Status must be a valid number.', 'store-manager-for-woocommerce' ), array( 'status' => 400 ) );
        }
        $status = absint( $request['status'] );

        // Validate and sanitize the filter_id
        if ( ! isset( $request['filter_id'] ) || ! is_numeric( $request['filter_id'] ) ) {
            return new WP_Error( 'invalid_filter_id', __( 'Filter ID must be a valid number.', 'store-manager-for-woocommerce' ), array( 'status' => 400 ) );
        }
        $filter_id = absint( $request['filter_id'] );

        // Badge data (assuming it's an array and already sanitized by another process)
        if ( ! isset( $request['badge_data'] ) || ! is_array( $request['badge_data'] ) ) {
            return new WP_Error( 'invalid_badge_data', __( 'Badge data must be a valid array.', 'store-manager-for-woocommerce' ), array( 'status' => 400 ) );
        }
        $badge_data = $request['badge_data'];

        // Badge style (assuming it's an array and already sanitized by another process)
        if ( ! isset( $request['badge_style'] ) || ! is_array( $request['badge_style'] ) ) {
            return new WP_Error( 'invalid_badge_style', __( 'Badge style must be a valid array.', 'store-manager-for-woocommerce' ), array( 'status' => 400 ) );
        }
        $badge_style = $request['badge_style'];
        
        $prepared_data = array(
            'badge_name'  => $badge_name,
            'badge_type'  => $badge_type,
            'badge_data'  => json_encode( $badge_data ),
            'badge_style' => json_encode( $badge_style ),
            'priority'    => $priority,
            'status'      => $status,
            'filter_id'   => $filter_id,
        );
        
        return $prepared_data;
    }

    /**
	 * Prepares the item for the REST response.
	 *
	 * @param object           $item    WordPress's representation of the item.
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function prepare_item_for_response( $item, $request ) {//phpcs:ignore
		$data       = array();

		$data['id'] = 0;

		if ( ! empty( $item['id'] ) ) {
			$data['id'] = $item['id'];
		}

		$data['badge_name'] = '';

		if ( ! empty( $item['badge_name'] ) ) {
			$data['badge_name'] = $item['badge_name'];
		}

		$data['badge_data'] = array();

		if ( ! empty( $item['badge_data'] ) ) {
			$data['badge_data'] = $item['badge_data'];
		}

		$data['badge_style'] = array();

		if ( ! empty( $item['badge_style'] ) ) {
			$data['badge_style'] = $item['badge_style'];
		}

		$data['priority'] = '';

		if ( ! empty( $item['priority'] ) ) {
			$data['priority'] = $item['priority'];
		}

        $data['status'] = '';

		if ( ! empty( $item['status'] ) ) {
			$data['status'] = $item['status'];
		}

        $data['filter_id'] = '';

		if ( ! empty( $item['filter_id'] ) ) {
			$data['filter_id'] = $item['filter_id'];
		}

        $data['created_by'] = '';

		if ( ! empty( $item['created_by'] ) ) {
			$data['created_by'] = $item['created_by'];
		}

		$data['created_at'] = '';

		if ( ! empty( $item['created_at'] ) ) {
			$created_date = gmdate( DATE_W3C, strtotime( $item['created_at'] ) );

			$data['created_at'] = $created_date;
		}

		$data['updated_at'] = '';

		if ( ! empty( $item['updated_at'] ) ) {
			$modified_date = gmdate( DATE_W3C, strtotime( $item['updated_at'] ) );

			$data['updated_at'] = $modified_date;
		}

		$context = ! empty( $request['context'] ) && is_string( $request['context'] ) ? $request['context'] : 'view';//phpcs:ignore

		$data = $this->filter_response_by_context( $data, $context );

		$response = rest_ensure_response( $data );
		$response->add_links( $this->prepare_links( $item ) );

		return $response;
	}
}