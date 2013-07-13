<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8" />
	<title><?php bloginfo(); wp_title("",true); ?>s</title>
	<link href="favicon.ico" type="image/x-icon" rel="shortcut icon" />
	<link type="text/css" rel="stylesheet" href="<?php bloginfo("template_url"); ?>/style/1styles.css" />
	<link type="text/css" rel="stylesheet" href="<?php bloginfo("template_url"); ?>/style.css" />
	<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/script/html5shiv.js" ></script>
	<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/script/jquery.js" ></script>
	<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/script/jquery.easing.1.3.js" ></script>
	<script type="text/javascript" src="<?php bloginfo("template_url"); ?>/script/script.js" ></script>
	<script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script> <!-- work when upload on host -->
</head>
<body>
	<header class="fix"></header>
	<section class="container">
		<div class="logo">
			<h1>Khavaran Bar</h1>
			<p>International Transport CO</p>
		</div>
		<section class="leftside fix">
			<div class="translate">
				<div id="google_translate_element"><span id="trans">Translate:&nbsp</span></div>
				<script>
					function googleTranslateElementInit() {
					  new google.translate.TranslateElement({
					    pageLanguage: 'en',
					    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
					  }, 'google_translate_element');
					}
				</script>
			</div>
            <nav>
                <menu>
                    <li><a href="page1.svg">Home</a></li>
                    <li><a href="page2.svg">About US</a></li>
                    <li><a href="page3.svg">Services</a></li>
                    <li><a href="page4.svg">Inquiry</a></li>
                    <li><a href="page5.svg">Contact Us</a></li>
                </menu>
            </nav>
		</section>