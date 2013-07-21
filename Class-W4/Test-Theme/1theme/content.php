<div id="preloader-container">
<div id="container">
  
<?php

$args = array(
  'post_type' => 'post',
  'category_name' => 'تست',
  'orderby' => 'title',
  'order' => 'ASC',
);

$query = new WP_Query($args);

  while($query->have_posts()){
  $query->the_post(); 
?>
  <div class="widget portfolio web homepage">
    <div class="entry-container span4">
    
      <!-- Portfolio Image -->
      <?php if(has_post_thumbnail()){ ?>
      <div class="entry-image">
        <a href="<?php echo wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) ); ?>" class="fancybox">
          <span class="entry-image-overlay"></span>
          <?php the_post_thumbnail('medium'); ?>
        </a>
      </div>
      <?php 
        }
        else{
          ?>
            <div class="entry-image">
              <a href="images/noimage.png" class="fancybox">
                <span class="entry-image-overlay"></span>
                <img src="images/noimage.png" alt="">
              </a>
            </div>
      <?php 
        }
      ?>

      <div class="entry drop-shadow curved ">

        <!-- Portfolio Heading -->
        <h5 class="heading">
          <a href="portfolio-single.html">
            <?php the_title(); ?>
          </a>
        </h5>
        <div class="entry-footer">
          <ul>
            <li class="left">گرافیک</li>
            <li class="right no-margin"><div class="icon like"></div> 3</li>
      
          </ul>
        </div>

        <p><?php the_excerpt(); ?></p><br />
        <?php the_content(); ?><br />
        <p>
        نوشته شده توسط: <?php the_author(); ?><br />
          <?php the_category(); ?><br />
          <?php the_tags(); ?><br />
        </p>
        <div class="stripes"></div>
      </div>      
    </div>
  </div>

<?php 
  } 
?>
</div>
</div>
