var WindowSlider = function(selector, slideDesc) {
	var self = this;

	self.$w = $(window);
	self.$sections = $(selector);
	self.slideDesc = slideDesc; 
	self.lastF = 0;
	self.h = null;

	self.$w
		.on("resize", function() {
			self.h = self.$w.height();
			self.manageSlideFixation(self.lastF);
		})
		.on("scroll", function() {
			var s = self.$w.scrollTop(),
				curF = Math.floor(s / self.h);

			if (curF === self.lastF) {
				return;
			}

			self.manageSlideFixation(curF);
			self.lastF = curF;
		})
		.trigger("resize");
}

WindowSlider.prototype.manageSlideFixation = function (fixer) {
	var topPrev = 0,
		curSlide = this.slideDesc[fixer],
		limiter = curSlide.logical != undefined ? curSlide.logical : curSlide.parent;

	for (var i in this.slideDesc) {
		var slide = this.slideDesc[i];

		if (curSlide.wontFix && slide.logical == limiter) {
			var top = parseInt(this.$sections.get(slide.logical + 1).style["top"]) - this.h;
			
			this.$sections.get(slide.logical).style["top"] = top + "px";
			this.$sections.get(slide.logical).style["position"] = "";
			this.$sections.get(slide.logical).style["zIndex"] = "";

			this.$sections.get(slide.logical + 1).style["top"] = top + "px";
			break;
		}

		if (slide.hasOwnProperty("logical")) {
			if (slide.logical <= limiter) {
				this.$sections.get(slide.logical).style["top"] = 0;
				this.$sections.get(slide.logical).style["position"] = "fixed";
				this.$sections.get(slide.logical).style["zIndex"] = slide.logical - 10;	
			} else {
				this.$sections.get(slide.logical).style["top"] = topPrev + "px";
				this.$sections.get(slide.logical).style["position"] = "";
				this.$sections.get(slide.logical).style["zIndex"] = "";
			}
			topPrev += this.h * (slide.children + 1);
		}
	}

	if (curSlide.cb != undefined) {
		curSlide.cb();
	}
}