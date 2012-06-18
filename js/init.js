$(function(){ 
	// Configuración del Scroll
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
	
	//Configuración del popup inicial
	$('.intro').fancybox({
		padding : 10,
		autoDimensions: true,
		overlayShow: false,
		hideOnContentClick: true,
		scrolling: false,
		speedIn: 100,
		speedOut: 100		
	});
	
	// Configuración de las zonas calientes
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
	
	// Configuración de las burbujas del menú izquierdo
	$('.menu_izdo .boton a').CreateBubblePopup({ 
		innerHtmlStyle: 	  	{ color:'#5e5e5e', 'text-align':'center', 'font-size': '12px'},
		themeName: 	  	 	'azure',
		themePath: 	  	 	'images/jquerybubblepopup-themes',							  						 
		manageMouseEvents:	false,
		position: 'bottom',
		align: 'center'
	});
	
	$('.menu_izdo .boton a').click(function(){
			if( !$(this).data('visible') ){
			
				$('.menu_izdo .boton a').data('visible', false);
				$(this).data('visible', true);
				
				$('.menu_izdo .boton a').HideAllBubblePopups();
				
				var tipcontent = $(this).parent().next('.tipcontent').html();
				if (tipcontent)
					$(this).SetBubblePopupInnerHtml( tipcontent );
				else
					$(this).SetBubblePopupInnerHtml( $(this).attr('alt') );
				$(this).ShowBubblePopup();
				
				var img_position = $(this).parent().prev().offset();
				var img_top = parseInt(img_position.top);
				var img_left = parseInt(img_position.left);
				var area_x = parseInt($(this).attr('coords').split(',')[0]);
				var area_y = parseInt($(this).attr('coords').split(',')[3]);
				var area_width = parseInt($(this).attr('coords').split(',')[2] - $(this).attr('coords').split(',')[0]);
				var bubble_width  = parseInt($('#'+$(this).GetBubblePopupID()).outerWidth(false));
				var bubble_height = parseInt($('#'+$(this).GetBubblePopupID()).outerHeight(false));
			
				$('#'+$(this).GetBubblePopupID()).css({ top: (area_y+img_top)+'px', left: (area_x+img_left+Math.abs(area_width/2)-Math.abs(bubble_width/2))+'px' });
			
			}
			else {
			$('.menu_izdo .boton a').HideAllBubblePopups();
			$('.menu_izdo .boton a').data('visible', false);
		};
	});
	
	
	
	// Configuración de las burbujas de las zonas calientes
	$('area').css({ display: 'block'});
	$('area').each(function(){
		$(this).offset({ top: $(this).parent().prev().offset().top, left: $(this).parent().prev().offset().left });	
	});
	
	$('area').CreateBubblePopup({ 
		innerHtmlStyle: 	  	{ color:'#5e5e5e', 'text-align':'center', 'font-size': '12px'},
		themeName: 	  	 	'azure',
		themePath: 	  	 	'images/jquerybubblepopup-themes',							  						 
		manageMouseEvents:	false,
		position: 'bottom',
		align: 'center'
	});

	$('area').data('visible', false);
	
	var timer;
	$('area').mouseover(function(){
	
			if( !$(this).data('visible') ){
			
				$('area').data('visible', false);
				$(this).data('visible', true);
				
				$('area').HideAllBubblePopups();
				
				var tipcontent = $(this).next('.tipcontent').html();
				if (tipcontent)
					$(this).SetBubblePopupInnerHtml( tipcontent );
				else
					$(this).SetBubblePopupInnerHtml( $(this).attr('alt') );
				$(this).ShowBubblePopup();
				
				var img_position = $(this).parent().prev().offset();
				var img_top = parseInt(img_position.top);
				var img_left = parseInt(img_position.left);
				var area_x = parseInt($(this).attr('coords').split(',')[0]);
				var area_y = parseInt($(this).attr('coords').split(',')[3]);
				var area_width = parseInt($(this).attr('coords').split(',')[2] - $(this).attr('coords').split(',')[0]);
				var bubble_width  = parseInt($('#'+$(this).GetBubblePopupID()).outerWidth(false));
				var bubble_height = parseInt($('#'+$(this).GetBubblePopupID()).outerHeight(false));
			
				$('#'+$(this).GetBubblePopupID()).css({ top: (area_y+img_top)+'px', left: (area_x+img_left+Math.abs(area_width/2)-Math.abs(bubble_width/2))+'px' });
			
			};
	});

	/*
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
*/
	
	// Configuración botonera desplegable
	var ancho;
	$('.despliegue').click(function(){
		if ($('.despliegue').hasClass('cerrado')) {
			// Abre
			$('.pie').animate({	width: ancho}, 'fast');
			$('.ruta, .botones').fadeIn('fast');
			$('.despliegue').html('<a href="#"><img src="img/solapa_inf_open.png" /></a>').removeClass('cerrado');;			
		}
		else {
			// Cierra
			ancho  = $('.pie').width();
			$('.ruta, .botones').fadeOut('fast');
			$('.pie').animate({width: 55}, 'fast');
			$('.despliegue').html('<a href="#"><img src="img/solapa_inf_close.png" /></a>').addClass('cerrado');
		}
		
	});
	
});