$(document).ready(function() {
	var $w = $(window);
		$sections = $("section"),
		l = $sections.length;
		lastF = null,
		h = null,

		manageSlideFixation = function (fixer) {
			for (var i = fixer; i >= 0; i--) {
				$sections.get(fixer).style["top"] = 0;
				$sections.get(i).style["position"] = "fixed";
				$sections.get(i).style["zIndex"] = fixer - l;
			}

			for (var i = fixer + 1; i < $sections.length; i++) {
				$sections.get(i).style["top"] = i * h + "px";
				$sections.get(i).style["position"] = "";
				$sections.get(i).style["zIndex"] = "";
			}
		};

	$w.on("resize", function() {
		h = $w.height();
		manageSlideFixation(lastF);
	})

	$w.on("scroll", function(e, afterResize) {
		var s = $w.scrollTop(),
			curF = Math.floor(s / h);

		if (curF === lastF) {
			return;
		}

		manageSlideFixation(curF);
		lastF = curF;
	})

	$w.trigger("resize");
})