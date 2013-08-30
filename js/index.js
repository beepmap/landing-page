$(document).ready(function() {
	var bubble = function(selector) {
			$(selector).addClass("active");
		},
		phone = function(num) {console.log("phone", num)},
		slides = [
			{},
			{
				children: 3,
				cb: function() {
					bubble(".bubble.left");
				}
			},
			{
				cb: function() {
					bubble(".bubble.right");
				}
			},
			{
				cb: function() {
					bubble(".bubble.bottom");
				}
			},
			{},
			{
				children: 4,
				scrollOnEnd: true,
				stopFix: true,
				cb: phone
			},
			{
				cb: phone
			},
			{
				cb: phone
			},
			{
				cb: phone,
				
			},
			{},
			{}
	];

	new WindowSlider("section", slides);
})
