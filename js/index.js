$(document).ready(function() {
	var $pics = $(".slides img"),
		$pic0 = $(".slides img").eq(0),
		$slides = $(".slides");
		$phoneBubbles = $(".iphone .bubble");

		bubble = function(selector) {
			$(selector).toggleClass("active");
		},
		pic = function(num) {
			$pics.eq(num).addClass("active");
		}
		phone = function(num) {console.log("phone", num)},
		slides = [
			{},
			{
				children: 3,
				cb: function() { bubble(".car .bubble.left"); }
			},
			{
				cb: function() { bubble(".car .bubble.right"); }
			},
			{
				cb: function() { bubble(".car .bubble.bottom"); }
			},
			{},
			{
				children: 5,
				stopFix: true,
				cb: function() { 
					pic(0); 
					setTimeout(function() {
						bubble(".overview .left.top");
					}, 100);
				}
			},
			{
				cb: function() { 
					pic(1); 
					bubble(".overview .left.top");
					setTimeout(function() {
						bubble(".overview .right.top");
					}, 100);
				}
			},
			{
				cb: function() { 
					pic(2); 
				}
			},
			{
				cb: function() { 
					pic(3); 
					bubble(".overview .right.top");
					setTimeout(function() {
						bubble(".overview .left.bottom"); 
					}, 100);
					
				}
			},
			{
				cb: function() { 
					pic(4); 
					bubble(".overview .left.bottom");
					setTimeout(function() {
						bubble(".overview .right.bottom");
					}, 100);
				}
			},
			{},
			{}
	];

	new WindowSlider("section", slides);

	$(window).on("resize", function() {
		$slides.css({
			'margin-left': -$pic0.width()/2 + "px"
		})
	}).trigger("resize");
});