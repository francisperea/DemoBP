$(function(){
	$('a[href^="#"]').live('click', function() {
		var hash = $(this).attr('href');
		var offset = $(hash).offset();
		if (offset) {
			$('html, body').animate({ scrollLeft: offset.left }, 'slow');
			location.hash = hash;
			return false;
		}
	});
});