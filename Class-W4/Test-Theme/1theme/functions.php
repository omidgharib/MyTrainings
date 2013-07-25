<?php
function custome_theme_init (){
	$labels = array(
	    'name' => _x('product', 'post type general name'),
	    'singular_name' => _x('product', 'post type singular name'),
	    'add_new' => _x('Add New', 'product'),
	    'add_new_item' => __('Add New product'),
	    'edit_item' => __('Edit product'),
	    'new_item' => __('New product'),
	    'view_item' => __('View product'),
	    'search_items' => __('Search product'),
	    'not_found' =>  __('No product found'),
	    'not_found_in_trash' => __('No product found in Trash'),
	    'parent_item_colon' => '',
	    'menu_name' => _x('product', 'post type general name')
	);

	$args = array(
	    'labels' => $labels,
	    'public' => true,
	    'publicly_queryable' => true,
	    'show_ui' => true,
	    'show_in_menu' => true,
	    'query_var' => true,
	    'rewrite' => true,
	    'capability_type' => 'post',
	    'has_archive' => true,
	    'hierarchical' => false,
	    'menu_position' => 20,
	    //'menu_icon' => get_bloginfo('template_url') . '/images/menu.png', // 16x16
	    'supports' => array('title','editor','thumbnail','excerpt')
	);

	register_post_type ('product',$args);

	add_theme_support('post-thumbnails');

	add_theme_support('menus');

	register_nav_menu('mainmenu', "Main Manu");

	register_taxonomy(
	  	'type',
	  	'product',
	  	array(
			'label' => _x( 'Type',"product taxonomy"),
	    	'rewrite' => array( 'slug' => 'type' )
		)
	);
}

add_action('init', 'custome_theme_init');