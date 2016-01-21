// resp menu
$( document ).ready(function() {
	
	$('.menu').click(function() {
	if ($('.side_nav').css("right") == "-200px") {
		$('.side_nav').animate({
			right : "10px"
		});

	} else {
		$('.side_nav').animate({
			right : "-200px"
		});

	}
}); 
	
});
