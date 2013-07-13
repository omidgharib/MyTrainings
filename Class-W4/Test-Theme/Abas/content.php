<div>This is my first theme</div>
<div class="posts">
	<?php
		if(have_posts()){
	?>
		<?php 
		while(have_posts()){ the_post(); ?>
			<article>
				<h1><?php the_title(); ?></h1>
				<p><?php the_content(); ?></p>
			</article>
	<?php 
			}
		} else{
	?>
		<article>
			<h1>Page Not Found</h1>
			<p>the requested URL ... </p>
		</article>
	<?php
		}
	?>

<!-- 	<ul class="nav">
		<?php
			wp_list_pages(array(
				'title_li' => ''
			));
		?>
	</ul> -->
</div>