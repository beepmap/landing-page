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
				cb: function() { bubble(".bubble.left"); }
			},
			{
				cb: function() { bubble(".bubble.right"); }
			},
			{
				cb: function() { bubble(".bubble.bottom"); }
			},
			{},
			{
				children: 4,
				stopFix: true,
				cb: function() { pic(0); } 
			},
			{
				cb: function() { pic(1); } 
			},
			{
				cb: phone
			},
			{
				cb: phone
			},
			{},
			{}
	];

	new WindowSlider("section", slides);

	$(window).on("resize", function() {
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
	}).trigger("resize");
});
