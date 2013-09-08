/*jshint strict: false, browser:true, jquery: true*/

$(document).ready(function() {
	var $pics = $(".slides img"),
		$pic0 = $(".slides img").eq(0),
		$slides = $(".slides"),

		bubble = function(selector) {
			$(selector).toggleClass("active");
		},

		pic = function(num) {
			$pics.eq(num).addClass("active");
		},

		phone = function(num) {console.log("phone", num);},

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
						bubble(".overview .bubble.left.top");
					}, 300);
				}
			},
			{
				cb: function() {
					pic(1);
					bubble(".overview .bubble.left.top");
					setTimeout(function() {
						bubble(".overview .bubble.right.top");
					}, 700);
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
					bubble(".overview .bubble.right.top");
					setTimeout(function() {
						bubble(".overview .bubble.left.bottom");
					}, 1200);

				}
			},
			{
				cb: function() {
					pic(4);
					bubble(".overview .bubble.left.bottom");
					setTimeout(function() {
						bubble(".overview .bubble.right.bottom");
					}, 700);

					setTimeout(function() {
						bubble(".overview .bubble.right.bottom");
						$(".bubble-final").each(function(i, el) {
							$(this).addClass("active");
						});
						pic(5);
					}, 10000);
				}
			},
			{},
			{}
	];

	new WindowSlider("section", slides);

	$(window).on("resize", function() {
		$slides.css('margin-left', -$pic0.width()/2 + "px");
	}).trigger("resize");
});
