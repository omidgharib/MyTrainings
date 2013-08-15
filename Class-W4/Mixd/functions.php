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
	    'supports' => array('title','editor','thumbnail','excerpt','custom-fields')
	);

	register_post_type ('product',$args);

	add_theme_support('post-thumbnails');

	add_theme_support('menus');

	register_nav_menu('mainmenu', "Main Manu");

	register_taxonomy (
  		'type',
  		'product',
  		array(
	      'labels' => array(
	      'name' => __('Types'),
	      'singular_name' => __('Types'),
	      'menu_name' => __('Type'),
	      'all_items' => __('All Types'),
	      'edit_item' => __('Edit Type'),
	      'view_item' => __('View Type'),
	      'update_item' => __('Update Type'),
	      'add_new_item' => __('Add New Type'),
	      'new_item_name' => __('New Type Name'),
	      'parent_item' => __('Parent Type'),
	      'search_items' => __('Search Types'),
	      'popular_items' => __('Popular Types'),
	      'parent_item_colon' => __('Popular Types :'),
	      'separate_items_with_commas' => __('Separate Types with commas'),
	      'add_or_remove_items' => __('Add or remove Type'),
	      'choose_from_most_used' => __('Choose from the most used Types'),
	      'not_found' => __( 'No Type found.' )
	    ),
	    'public' => true,
	    'show_ui' => true,
	    'show_in_nav_menus' => true,
	    'show_tagcloud' => true,
	    'hierarchical' => true,
	    'query_var' => 'type',
	    'rewrite' => array( 'slug' => 'type' )
    	)
	);
		add_shortcode('hello','say_hello');
	}

add_action('init', 'custome_theme_init');

function add_custom_box() {
  add_meta_box('priceid', 'Price', 'price_box', 'product','side');
  // add_meta_box($id, $title, $callback, $post_type, $context);
  // ali.md/wpref/add_meta_box
  function price_box() {
  $price = 0;
  $prevprice = 0;
  if ( isset($_REQUEST['post']) ) {
    $postID = (int)$_REQUEST['post'];
    $price = get_post_meta($postID,'Price',true);
    // ali.md/wpref/get_post_meta
    $price = (float) $price;
  }
  if ( isset($_REQUEST['post']) ) {
    $postID = (int)$_REQUEST['post'];
    $prevprice = get_post_meta($postID,'PrevPrice',true);
    // ali.md/wpref/get_post_meta
    $prevprice = (float) $prevprice;
  }

  echo "<label for='price'>Product Prices</label>";
  echo "<input id='price' title='Price' class='widefat' name='price' size='20' type='text' value='$price'>";
  echo "<input id='prevprice' title='Previous Price' class='widefat' name='prev_price' size='20' type='text' value='$prevprice'>";
  }
}

function save_meta($postID) {
  if ( is_admin() ) {
    if ( isset($_POST['price']) ) {
      $price = (float) $_POST['price'];
      update_post_meta($postID,'Price', $Price);
      // ali.md/wpref/update_post_meta
    }
    if ( isset($_POST['prev_price']) ) {
      $prevprice = (float) $_POST['prev_price'];
      update_post_meta($postID,'PrevPrice', $prevprice);
      // ali.md/wpref/update_post_meta
    }
  }
}

add_action('save_post','save_meta');
add_action('add_meta_boxes', 'add_custom_box');

add_action('admin_notices', 'welcome_notice');
function welcome_notice() {
  global $current_user;
  if ( !get_user_meta($current_user->ID, 'notice_ignored',true) ) {
    echo '<div class="updated"><p>';
    printf(__('<h2>Thanks for purchasing my theme. </h2><a href="%1$s" class="remove_message">Remove this message</a>'), '?welcome_notice_ignore=1');
    echo '</p></div>';
  }
}

add_action('admin_init', 'welcome_notice_ignore');
function welcome_notice_ignore() {
  global $current_user;
  if ( isset($_GET['welcome_notice_ignore']) ) {
    update_user_meta($current_user->ID, 'notice_ignored', (int)$_GET['welcome_notice_ignore']);
  }
}

register_sidebar(array(
  'name' => 'Sidebar Right',
  'id' => 'sidebar-r',
  'description' => 'Right panel ...',
  'before_widget' => '<section class="widget homepage %2$s">',
  'after_widget' => "</section>",
  'before_title' => '<h2 class="widgettitle">',
  'after_title' => "</h2>"
));

function say_hello($atts){
  extract( shortcode_atts( array(
    'name' => 'ali'
  ), $atts ) );
  return "<h1 style=\"color:red;text-align:center;\">Hello $name</h1>";
}