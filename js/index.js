$(document).ready(function() {
	var $pics = $(".slides img");
		bubble = function(selector) {
			$(selector).addClass("active");
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
				cb: function() { pic(0); bubble(".overview .bubble.left"); }
			},
			{
				cb: function() { pic(1); bubble(".overview .bubble.right"); }
			},
			{
				cb: function() { pic(2); }
			},
			{
				cb: function() { pic(3); }
			},
						{
				cb: function() { pic(4); }
			},
			{},
			{}
	];

	new WindowSlider("section", slides);

/*	$(window).on("resize", function() {
		var width = null;
		$pics.each(function(i, el) {
			var $el = $(el);
			if (!width) {
				width = $el.width();
			}
			$(el).css({
				'margin-left': -width/2 + "px"
			})
		})
	}).trigger("resize");*/
});
