//DOM ready
$(function()
{ 
	//Trigger insta feed:
   //instgram_feed(); /* Remove comment when you get the token and you're ready to tigger: instgram_feed() */
});


/* INSTAGRAM FEED
----------------------------------------------------------------*/
function instgram_feed()
{	
	//Items to show
	var count = "21";
	
	//Hashtag to pull images:
	var hashtag = "hashtag_goes_here";
	
	//Authorize application - Read instagram developers guide: https://www.instagram.com/developer/
	var token = "Read:instagram.com/developer/authentication/";
	
	//Tag endpoints API
	var url = 'https://api.instagram.com/v1/tags/'+hashtag+'/media/recent?access_token='+token+'&count='+count+'&callback=?';
	
	//Request
	$.getJSON(url,function(data)
	{
		//Get template
		var template = $($('#instagram-template').html());
		
		//target feed wrapper
		var wrap = $('#instagram-feed');
		
		//Create wrapper for all items
		var container = $('<div class="sbcnt-inst-group" />');
		
		// loop the post and get info: api response
		$(data.data).each(function(i, post)
		{
			//Clone template
			var item = template.clone();
			
			//Get data from API request - check your net-tab and obtain any data you need - likes,comments etc. - for my feed i need the followings:
			var user = post.user.username;
			var photo_link = post.link;
			var desc = post.caption.text;
			var img_l = post.images.standard_resolution.url;
		
						
			// finalize
			item.attr('data-background', img_l); /* Using js to add css background image for carousel, FN: get_background_image() */
			item.find('.sbcnt-inst-link').attr('href', photo_link);
			item.find('.sbcnt-inst-caption').text(desc);
			item.find('.sbcnt-inst-handle').text("@"+user);
			
	
			container.append(item);
		});
		
		//Append items to wrapper		
		wrap.append(container);
		
		//Callback
		slick_slide_callback();
	});
}

/* Slick Slider callback
----------------------------------------------------------------*/
function slick_slide_callback()
{
	//Target slider
	var $slider = $("#instagram-feed .sbcnt-inst-group");
	
	if($slider.length)
	{		  		
		$slider.slick({
	  		autoplay: false,
	  		slide: ".sbcnt-inst-item",
	  		prevArrow: ".sbcnt-inst-prev",
	  		nextArrow: ".sbcnt-inst-next",
	  		arrows: true,
	  		dots: false,
	  		infinite: true,
	  		slidesToShow: 3,
	  		slidesToScroll: 3
		});
		
		get_background_image();
	  	
  		//Get bg image on slide change - respect the dom - 21 images on load it's a lot of kb.
  		$slider.on('afterChange', function(event)
  		{  	  
	  		get_background_image();	   
		});
		
	}
}

/* Get background image - load css background images
----------------------------------------------------------------*/
function get_background_image()
{
	//Get bg image
  	$('#instagram-feed .slick-active:not(.loaded)').each(function()
  	{
	  var $bg = $(this).attr("data-background");
	  	
	  $(this).css('background-image','url(' + $bg + ')').addClass("loaded");	  
  	});	
}

