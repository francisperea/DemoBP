$(function(){ 
	$('.navegacion, .content, .ruta').localScroll({
		target: '#ventana',
		axis: 'x',
		//easing: 'easeOutBack',
		duration: 250,
		hash: true,
		onBefore: function(){
		    $.fancybox.close();
		},
		onAfter: function(anchor, settings){
			var diapo=$('#'+anchor.id);
			var boton =diapo.find('.intro');
			if (boton) {
				boton.trigger('click');
			}
		}
	});
	
	$('.intro').fancybox({
		padding : 0,
		autoDimensions: true,
		overlayShow: false,
		hideOnContentClick: true,
		scrolling: false,
		speedIn: 100,
		speedOut: 100		
	});
	
	$('img[usemap]').maphilight({
		fill: true,							
		fillColor: '35d4fd',
		fillOpacity: 0.3,
		stroke: true,
		strokeColor: '28a6c7',
		strokeOpacity: 1,
		strokeWidth: 1,
		fade: false,
		alwaysOn: true,
		shadow: true,
		shadowX: 5,
		shadowY: 5,
		shadowRadius: 6,
		shadowColor: '000000',
		shadowOpacity: 0.8,
		shadowPosition: 'outside',
		shadowFrom: false
	})
	
	// <AREA> tags are invisible elements inside the DOM, 
	// therefore to attach correctly a bubble popup to them, 
	// we need to display and position <AREA> tags...

	$('area').css({ display: 'block'});
	//$('area').offset({ top: $('img').offset().top, left: $('img').offset().left });
	$('area').each(function(){
		$(this).offset({ top: $(this).parent().prev().offset().top, left: $(this).parent().prev().offset().left });	
	});
	

	//create bubble popups for each area tag and disable mouse events...
	$('area').CreateBubblePopup({ innerHtmlStyle: 	  	{ color:'#FFFFFF', 'text-align':'center', 'font-size': '14px'},
								  themeName: 	  	 	'all-black',
								  themePath: 	  	 	'images/jquerybubblepopup-themes',							  						 
								  manageMouseEvents:	false,
								  position: 'bottom',
								  align: 'center'
							   });

	// all popups of <AREA> tags are invisible
	$('area').data('visible', false);
	
	//set a timer
	var timer;
	
	// add a customized mouseover event for each <AREA> tag...
	$('area').mouseover(function(){
	
			clearTimeout(timer);
	
			if( !$(this).data('visible') ){
			
				// all popups must be invisible, but only this one is visible
				$('area').data('visible', false);
				$(this).data('visible', true);
				
				//hide all popups, update the innerHtml and show this popup
				$('area').HideAllBubblePopups();
				
				var tipcontent = $(this).next('.tipcontent').html();
				if (tipcontent)
					$(this).SetBubblePopupInnerHtml( tipcontent );
				else
					$(this).SetBubblePopupInnerHtml( $(this).attr('alt') );
				$(this).ShowBubblePopup();
				
				//get <IMG> position and <AREA> coordinates...
				//var img_position = $('img').offset();
				var img_position = $(this).parent().prev().offset();
				var img_top = parseInt(img_position.top);
				var img_left = parseInt(img_position.left);
				var area_x = parseInt($(this).attr('coords').split(',')[0]);
				var area_y = parseInt($(this).attr('coords').split(',')[3]);
				var area_width = parseInt($(this).attr('coords').split(',')[2] - $(this).attr('coords').split(',')[0]);
				var bubble_width  = parseInt($('#'+$(this).GetBubblePopupID()).outerWidth(false));
				var bubble_height = parseInt($('#'+$(this).GetBubblePopupID()).outerHeight(false));
			
				//move the bubble popup to the <AREA> coordinates...
				$('#'+$(this).GetBubblePopupID()).css({ top: (area_y+img_top)+'px', left: (area_x+img_left+Math.abs(area_width/2)-Math.abs(bubble_width/2))+'px' });
			
			};
	});

	//if the mouse leaves the <AREA>, wait 3 seconds then hide all bubble poups...
	$('area').mouseleave(function(){

		if( $(this).data('visible') ){
			var seconds_to_wait = 1;
			function doCountdown(){
				timer = setTimeout(function(){
					seconds_to_wait--;
					if(seconds_to_wait > 0){
						doCountdown();
					}else{
						clearTimeout(timer);
						$('area').HideAllBubblePopups();
						$('area').data('visible', false);
					};
				},1000);
			};
			doCountdown();
		};
		
	});
	
});