$(document).ready(function() {
	var bubble = function(num) {console.log("bubble", num)},
		phone = function(num) {console.log("phone", num)}, 
		slides = [
			{
				children: 0,
				logical: 0
			},
			{
				children: 2,
				cb: bubble,
				logical: 1
			},
			{
				cb: bubble,
				parent: 1
			},
			{
				cb: bubble,
				parent: 1
			},
			{
				children: 3,
				cb: phone,
				logical: 2
			},
			{
				cb: phone,
				parent: 2
			},
			{
				cb: phone,
				parent: 2
			},
			{
				cb: phone,
				wontFix: true,
				parent: 2
			},
			{
				children: 0,
				logical: 3
			}
	]

	new WindowSlider("section", slides);
})