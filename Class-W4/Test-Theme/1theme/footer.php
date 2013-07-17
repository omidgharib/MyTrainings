
<!-- Footer
================================================== -->
<!-- Copyright & Social Buttons -->
 
 <div class="footer">
 	<ul>
		<li class="left">© Copyright 2013 <a href="http://1dws.com">1Devs</a></li>
	
		<li class="social-button right"><a rel="alternate" data-original-title="Facebook"><img src="img/social-icons/glyphicons_410_facebook.png" alt="" /></a></li>
		<li class="social-button right"><a rel="alternate" data-original-title="Google+"><img src="img/social-icons/glyphicons_382_google_plus.png" alt="" /></a></li>
		<li class="social-button right"><a rel="alternate" data-original-title="Twitter"><img src="img/social-icons/glyphicons_411_twitter.png" alt="" /></a></li>
		<li class="social-button right"><a rel="alternate" data-original-title="Vimeo"><img src="img/social-icons/glyphicons_414_vimeo.png" alt="" /></a></li>
		<li class="social-button right"><a rel="alternate" data-original-title="LinkedIn"><img src="img/social-icons/glyphicons_397_linked_in.png" alt="" /></a></li>
		<li class="social-button right"><a rel="alternate" data-original-title="Dribble"><img src="img/social-icons/glyphicons_394_dribbble.png" alt="" /></a></li>

 	</ul>
 </div>
 </div>
 
 <!-- CHANGE HOVER TO ON CLICK FOR MOBILE DEVICES
 ================================================== -->
 
 <script>
 var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
 
 if (isiPad) { 
	 $("nav ul li").click(function() {
	 	event.stopPropagation();
	 	$("ul", this).toggle();
	 });
	
	$(document).click( function(){
		$('nav ul li > ul').hide();
	});
}
 </script>
 
 <!-- CONTACT FORM
 ================================================== -->
 <!-- AJAX contact form -->
  
 <script>
 	$('.submit').click(function() {
 		
 		var name = $("#name").val();
 		var email = $("#email").val();
 		var message = $("#message").val();
 		
 		var dataString = 'name='+ name + '&email=' + email + '&message=' + message;  
 		//alert (dataString);return false;  
 		$.ajax({  
 		  type: "POST",  
 		  url: "contact.php",  
 		  data: dataString,  
 		  success:  function (html) { 
 		  	if (html == "invalid_email ") {
 		  		$('.contact-alerts').empty();
 		  		$('.contact-alerts').append('<div id="email-error" class="alert alert-error">ایمیل را درست وارد کنید</div>');
 		  	} else if (html == "success ") {
 		 		$('.contact-alerts').empty();
 				$('.contact-alerts').append('<div id="email-success" class="alert alert-success">پیام شما ارسال شد</div>');
 		  	} else if (html == "error ") {
 		  		$('.contact-alerts').empty();
 		  		$('.contact-alerts').append('<div id="email-error" class="alert alert-error">لطفا جاهای خالی را پر کنید</div>');
 		  	}
 
 		  }  
 		});  
 	});
 </script>
 
 <!-- JQUERY (load more)
 ================================================== -->
 <!-- Make sure Load more only works for blog -->
 
 <script>
 if(document.location.toString().indexOf('#filter=.blog')!=-1){
 
 	$("#page_nav").css("display","block");
 	
 } else {
 
 	$("#page_nav").css("display","none");
 
 }
 </script>
 
<!-- JQUERY (tabs)
================================================== -->
<!-- Script for the awesome tabs -->

<script>
$('#myTab a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
})

$('#myTab2 a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
})

$('#about a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
})
</script>

<!-- JQUERY (flexslider)
================================================== -->
<!-- Script for the awesome slider -->

<script type="text/javascript">
  $(function() {
    $('.full-slider .flexslider').flexslider({
    	animation: "slide",
    	directionNav: true, 
    
    });
    
    $('.widget-slider .flexslider').flexslider({
    	animation: "slide",
    	directionNav: false, 
    	slideshow: false
    
    });
    
  });
</script>

<!-- JQUERY (tooltips)
================================================== -->
<!-- Script for the awesome tooltips -->

<script>
$("[rel=alternate]").tooltip()
</script>

<!-- JQUERY (hash)
================================================== -->
<!-- reexcute scripts on hash change -->

<script>

$(window).bind( 'hashchange', function( event ) {
  $.getScript("js/load-more.js")
});

</script>

<!-- JQUERY (fancy)
================================================== -->
<!-- Script for the awesome fancybox -->

<script type="text/javascript">
	$(document).ready(function() {
		$(".fancybox").fancybox({
			helpers : {
			        overlay : {
			            locked : false
			        }
			    },
			    
			    padding: ['5px', '5px', '5px', '5px']
		});
	});
</script>

<!-- JQUERY (isotope)
================================================== -->
<!-- Script for the super awesome grid (Thanks, David DeSandro) -->

<script src="js/jquery.isotope_custom.js"></script> 
    
  </body>
</html>