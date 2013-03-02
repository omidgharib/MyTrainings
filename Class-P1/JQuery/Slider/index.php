<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="utf-8"/>
	<title>OMG-Slider</title>
	<link rel="stylesheet" href="style.css">
	<script type="text/javascript" src="jquery.js" ></script>	
</head>
<body>
	<div class="container">
		<div class="slideshow cover">
			<div id="slider">
				<div class="train cover">
					<?php

						function getBackFiles($path,$format) {
							$files=scandir($path);
							$selectedFiles=array();
							foreach ($files as $file ) {
								$temp=explode('.', $file);
								if (strtolower(end($temp))==$format) {
									$selectedFiles[]=$file;
								}
							}
							return $selectedFiles;
							//getimagesize(filename)
						}

						 $slideLen=0;
						 $img_path='./images/slides';
						 $imgs=getBackFiles($img_path,'jpg');
						 foreach ($imgs as $img ) {
						 	echo "<div class='slide' style=\"background-image: url('$img_path/$img');\"></div>";
						 	$slideLen++;
						 }


					?>

				</div>
				<div class="previous"></div>	
				<div class="next"></div>	
				<div class="loading">
					<canvas id="loading" width="40" height="40" ></canvas> 
				<span class="pause"></span>
				</div>
			</div>
			<ul class="btns cover">
				<?php
					for($i=0 ; $i<$slideLen ; $i++){
						echo "<li></li>";
					}
				?>
			</ul>
		</div>
	</div>								
</body>
<script type="text/javascript" src="script.js"></script>
</html>

<!-- ref:http://www.zurb.com/playground/jquery_image_slider_plugin -->