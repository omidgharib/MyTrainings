<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="utf-8"/>
	<title>OMG-Slider</title>
	<link rel="stylesheet" href="../style.css">
	<script type="text/javascript" src="../jquery.js" ></script>	
</head>
<body>
	<div class="container">
		<div class="slideshow cover">
			<div id="slider">
				<div class="train cover">
					<?php
						function imageSizeChecking($img,$sizeWidth,$sizeHeight){
							list($width, $height, $type, $attr)=getimagesize($img);
							if ($width==$sizeWidth&&$height==$sizeHeight) return true;
							else return  false;
						}

						function getBackImages($path,$format,$width,$height) {
							$files=scandir($path);
							$selectedFiles=array();
							foreach ($files as $file ) {
								$temp=explode('.', $file);
								if (end($temp)==$format) {
									if (imageSizeChecking("$path/$file",$width,$height)) {
										$selectedFiles[]=$file;
									}
								}
							}
							return $selectedFiles;
						}

						 $img_path='../images/slides';
						 $imgs=getBackImages($img_path,'jpg',940,500);
						 foreach ($imgs as $img ) {
						 	echo "<div class='slide' style=\"background-image: url('$img_path/$img');\"></div>";
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
					for($i=0 ; $i<count($imgs) ; $i++){
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