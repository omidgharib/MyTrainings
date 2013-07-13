$(function(){
	
	var content = $('section.container section.content-container section.main-holder'),
		content_page = $('section.main-holder > article.content-holder div'),
		li = $('section.container section.leftside > nav > menu > li'),
		img = $('section.main-holder > figure.img-holder img'),
		logo = $('section.container div.logo'),
		easein = 'easeOutBounce',
		easeout = 'easeInOutQuad',
		currentimg = 0;
		due = 800,
		delay = 600,
		step = 300;

	// for Load Effect
	setTimeout(function(){
		logo.css('display','block').animate({
			opacity:1
		},1500,'easeInQuad');
	},delay);
	delay += 700;

	li.each(function() {
        var that = this;
		setTimeout(function(){
			$(that).animate({
				left:0	
			},due,'easeOutBack');
		},delay);
		delay += step;
    }).mouseover(function(){
		$(this).animate({
			left:20
		},200,'easeOutExpo');
	}).mouseout(function(){
		$(this).animate({
			left:0
		},500,'easeOutExpo');
	});

	setTimeout(function(){
		content.css('display','block').animate({
			opacity:1
		},1400,'easeOutBack');
	},(delay+700));


	// for Change Page with Effect and Change Hash Page
	var loadpage = function(url){
		url = url.length > 2 ? url.substr(1) : 'index.html';
	}

	var slide = function(n){
		if(currentimg==n) return;
		img.eq(currentimg).animate({
			'top':'50px',
			'opacity':'0'
		},300,easeout,function(){
			$(this).css({
				'top':'-50px',
				'display':'none'
			}); 
		});

		img.eq(n).css({
			'display':'block'
		}).animate({
			'top':'0',
			'opacity':'1'
		},900,easein);	

		content_page.eq(currentimg).animate({
			'top':'-100px',
			'opacity':'0'
		},300,easeout,function(){
			$(this).css({
				'top':'100px',
				'display':'none'
			});
		});

		content_page.eq(n).css({
			'display':'block'
		}).animate({
			'top':'0',
			'opacity':'1'
		},900,easein);
		currentimg = n;
	}

	var pageUrl = window.location.href;
	sharPos = pageUrl.indexOf('#');
	if(sharPos){
		loadpage(pageUrl.substr(sharPos));
		pageUrl = pageUrl.substr(0,sharPos);
	}

	$('section.leftside a').click(function(){
		var url = $(this).attr('href');
		window.location.href = pageUrl + '#' + url;
		$("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 100 );
		return false;
	});

	var pagenum;
	window.onhashchange = function(){
		loadpage(window.location.hash);
		pagenum = window.location.hash;
		indx = pagenum.indexOf('.');
		pagenum = pagenum.substr(indx-1,1);
		slide(pagenum-1);
	}
	
	// Change Template
	$('span.blue').click(function(){
		$('section.background div.backimg').addClass('blue').removeClass('red');
		$('section.main-holder > figure.img-holder img.img1').attr("src","images/home-b.png");
		$('section.main-holder article.content-holder *').addClass('txt-blue').removeClass('txt-red');
	});
	$('span.red').click(function(){
		$('section.background div.backimg').addClass('red').removeClass('blue');
		$('section.main-holder > figure.img-holder img.img1').attr("src","images/home-r.png");
		$('section.main-holder article.content-holder *').addClass('txt-red').removeClass('txt-blue');
	});

	// Google Map API	
	var myCenter = new google.maps.LatLng(51.508742,-0.120850);	// latitude and longitude 

	function initialize()
	{
	var mapProp = {
	  center : myCenter,
	  zoom : 11,
	  mapTypeId : google.maps.MapTypeId.ROADMAP
	  };

	var map = new google.maps.Map($("div.gmap")[0],mapProp);
	var marker = new google.maps.Marker({
	  position : myCenter,
	  });

	marker.setMap(map);
	}

	google.maps.event.addDomListener(window, 'load', initialize); 

	});