$(function(){ 
	$('.navegacion, map, .content').localScroll({
		target: '#ventana',
		axis: 'x',
		//easing: 'easeOutBack',
		duration: 100,
		hash: true,
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
		autoDimensions: false,
		overlayShow: false,
		hideOnContentClick: true,
		scrolling: false
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
	
	 $("#zona01").tooltip({ effect: 'slide'});
});