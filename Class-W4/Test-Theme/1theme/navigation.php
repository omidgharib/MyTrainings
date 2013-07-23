<!-- Le Header
================================================== -->
<!-- This is the logo and navigation -->
<?php 
	$args = array(
		'type' => 'post',
		'orderby' => 'name',
		'order' => 'ASC',
		'hide_empty' => True
	);

	$all_categories = get_categories( $args );
	//print_r($all_categories);
?>

	<div class="navigation">
		<nav>
			
			<!-- Slap your MOBILE logo here -->
			<a class="mobile-logo" data-toggle="collapse" data-target="#nav-collapse">
				<span>یک تجربه</span>
			</a>
			
			<!-- NAVIGATION
			================================================== -->
			<!-- Navigation begins here -->
			
			<div id="nav-collapse" class="collapse">
				<ul class="nav">
				
					<!-- Slap your logo here -->
					<li class="logo"><a>یک تجربه</a></li>
					
					<!-- portfolio (drop down) -->
					<li>
						<a href="#filter=.portfolio" class="selected"><span data-toggle="collapse" data-target="#portfolio-collapse"></span>نمونه کارها</a>
						<ul id="portfolio-collapse" class="collapse out">
						<?php 
							foreach ($all_categories as $category) {
								$category_name = $category->name;
								$category_slug = $category->slug;
						?>
									<li><a href="#filter=.<?php echo $category_slug ?>"><?php echo $category_name ?></a></li>
						<?php
							}
						 ?>
							<!-- <li><a href="#filter=.graphics">گرافیک</a></li>
							<li><a href="#filter=.illustration">وب سایت</a></li>
							<li><a href="#filter=.web">موبایل</a></li> -->
						</ul>
					</li>
					
					<!-- blog -->
					<li><a href="#filter=.blog">بلاگ</a></li>
					
					<!-- grid widgets -->
					<li>
						<a href="#filter=.grid-widget">ویدجت</a>
					</li>
					
					<!-- elements
					<li>
						<a href="#filter=.shortcodes">المنت ها</a>
					</li> -->
					
					<!-- pages (drop down) -->
					<li>
						<a><span data-toggle="collapse" data-target="#pages-collapse"></span>صفحات</a>
						<ul id="pages-collapse" class="collapse out">
							<li><a href="#filter=.page-about">درباره</a></li>
							<li><a href="#filter=.page-team">تیم</a></li>
							<li><a href="#filter=.page-contact">ارتباط</a></li>
						</ul>
					</li>
					
				</ul>
			</div>
		</nav>	 
		<div class="nav-arrow">
		</div>
	</div>