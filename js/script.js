$(function(){

	var cPos = 0,
			siteLink = window.location.href.split( '#/' )[1],
			hashChangeSupport = $('html').hasClass('mdz-hashchange'),
			isHistoryAction = true;

	calculateSizes();
	initialize();
	doTabs();

	function initialize(){
		$(".sub_slider").slides({
			width: 960,
			navigation: true,
			pagination: false,
			slide: {
				interval: 900,
				browserWindow: !$("html").hasClass('lt-ie9'),
				easing: "easeInOutQuint"
			},
			preload: {
 				active: true,
 				image: "../img/logo_mini.png"
 			}
		});

		// Calculate the first article's height and animate the slider's height
		firstHeight = $(".slider article").first().height() + 60;
		$(".slider").animate({'height':firstHeight}, 900, "easeInOutQuint");

		// Make the slider arrows tiiiiiiiny
		$(".slidesNavigation").addClass('zeroScale').html('');

		// Fade In slider &amp; (lol) arrows
		$(".slider article:first-child").removeClass('isHidden isOpaque');
		$(".slidesControl").delay(1000).fadeIn(1000, "easeInOutQuint", function() {
			$(".slidesNavigation").removeClass('zeroScale')
		});

		// Animate the background
		bgAnim = setInterval(function() { cloudy(); }, 70);

		// Navigate to the correct section
		if (siteLink !== undefined &&  siteLink != "") {
			console.log(siteLink);
			var $thisLinkElement = $('nav li#' + siteLink); //
			switchContent($thisLinkElement);
			adjustBackgroundNav($thisLinkElement);
		}

		// History handling ~ Modern browsers + fallback
		hashChangeSupport == true	? window.onhashchange = historyChecks : historyChecksLegacy();

	} // initialize end
	$(window).resize(resizeAndScroll);

	function historyChecks(){
		var siteLink = window.location.href.split( '#/' )[1];
		var $thisLinkElement = $('nav li#' + siteLink);
		if (isHistoryAction == true) {
			switchContent($thisLinkElement);
			adjustBackgroundNav($thisLinkElement);
		}
	}

	function historyChecksLegacy(){
		var newSiteLink = window.location.href.split( '#/' )[1];
		var $thisLinkElement = $('nav li#' + newSiteLink);
		if (siteLink != newSiteLink && isHistoryAction == true) {
			siteLink = newSiteLink;
			switchContent($thisLinkElement);
			adjustBackgroundNav($thisLinkElement);
		}
		setTimeout(historyChecks, 300);
	}

	// Take care of positions, heights and scrolling after/during window resize
	function resizeAndScroll(){
		calculateSizes();
		var $cur = $(".current"),
				$currentPos = $cur.attr('data-pos'),
				$currentHeight = $cur.attr('data-height');
		$(".slider").animate({"scrollLeft": $currentPos, height: $currentHeight}, 0);

	}

	// Calculate article sizes and positions
	function calculateSizes(){
		windowWidth = $(window).width();
		$(".slider article").each(function(index){
			elPos = index * windowWidth;
			elHeight = $(this).height() + 50;
			$(this).css({'left':elPos,'width':windowWidth})
				   .attr('data-pos',elPos)
				   .attr('data-height',elHeight);
			$(this).find('header').css({'width':windowWidth});
		});
	} // calculateSizes end

	// Slide to the relevant article when clicking on menu
	function switchContent($toLink){
		clearTimeout(bgAnim);
		if ($("#mini_debtonator, #mini_debtonator_shadow").hasClass('isOpaque')) {
			setTimeout(function() {
				$("#mini_debtonator, #mini_debtonator_shadow").removeClass('noScale isOpaque');
			}, 1000);
		}
		$thisId = $toLink.attr('id');
		$thisPos = $("#c" + $thisId).attr('data-pos');
		$thisHeight = $("#c" + $thisId).attr('data-height');
		$(".slider article").removeClass('current');
		$("#c" + $thisId).addClass('current');
		if (location.hash != "" || location.hash != "#/features") {
			$(".hero_top, #hero_wrapper").slideUp(800, "easeInOutQuint");
			$('.xero_wrapper').delay(300).slideDown(800, 'easeInOutQuint', function() {
				$('.xero_wrapper > div div').removeClass('isOpaque');
			});
		}
		$(".slider").animate({"scrollLeft": $thisPos, height: $thisHeight}, 900, "easeInOutQuint", function() {

		});
	} // switchContent end




	// Tab handling
	function doTabs(){
		$(".tabs li a").bind('click',function(e){
			e.preventDefault();
			if ($(this).hasClass('active')) {
				return;
			} else {
				var $this = $(".tabs li .active"),
					$thisContent = $('.tabs_content #' + $this.attr('id')),
					$that = $(this),
					$thatContent = $('.tabs_content #' + $that.attr('id')),
					$borderEl = $("#tab_border"),
					$tabsEl = $(".tabs");
				if ( $that.attr('id') == 'tab_2' ) {
					$borderEl.addClass('green green_border');
					$tabsEl.addClass('green_border');
				} else {
					$borderEl.removeClass('green green_border');
					$tabsEl.removeClass('green_border');
				}
				$thisContent.removeClass('active');
				$thatContent.addClass('active');
				$this.removeClass('active');
				$that.addClass('active');
			}
		});
	} // doTabs end

	// Move the clouds by x
	function cloudy(){
	    cPos -= 1;
	    $('#hero_wrapper').css("backgroundPosition", cPos+"px 0");
	}

	// Binding keydown events for slider
	$(document).keydown(function(e){
		if (e.keyCode == 39) {
	  		$(".sub_slider").slides("next");
		}
		if (e.keyCode == 37) {
	  		$(".sub_slider").slides("previous");
		}
	});

	// Handle the navigation background
	$("nav ul li").bind('click',function(){
		isHistoryAction = false;
		siteLink = window.location.href.split( '#/' )[1];
		switchContent($(this));
		adjustBackgroundNav($(this));
		setTimeout(function() {
			isHistoryAction = true;
		}, 50);
	});

	function adjustBackgroundNav($this){
		$("nav").removeAttr('id');
		$thisId = $this.attr('id') + "_linkid";
		$("nav").attr('id',$thisId);
	}

});




