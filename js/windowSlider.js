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

	if (curSlide.wontFix) {
		var top = parseInt(this.$sections.get(limiter + 1).style["top"]) - this.h;
	
		this.setSlideTop(limiter, top);
		this.setSlideTop(limiter + 1, top);
	} else {
		for (var i in this.slideDesc) {
			var slide = this.slideDesc[i];

			if (slide.hasOwnProperty("logical")) {
				if (slide.logical <= limiter) {
					this.fixSlide(slide.logical);
				} else {
					this.setSlideTop(slide.logical, topPrev);
				}
				topPrev += this.h * (slide.children + 1);
			}
		}
	}

	if (curSlide.cb != undefined) {
		curSlide.cb();
	}
}

WindowSlider.prototype.fixSlide = function(slide) {
	this.$sections.get(slide).style["top"] = 0;
	this.$sections.get(slide).style["position"] = "fixed";	
}

WindowSlider.prototype.setSlideTop = function(slide, top) {
	this.$sections.get(slide).style["top"] = top + "px";
	this.$sections.get(slide).style["position"] = "";
}