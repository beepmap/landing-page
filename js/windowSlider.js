var WindowSlider = function(selector, limit) {
	var self = this;

	self.$w = $(window);
	self.$sections = $(selector),
	self.l = self.$sections.length;
	self.scrollUntil = limit ? limit : self.l;
	self.lastF = null,
	self.h = null;

	self.$w.on("resize", function() {
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
	if (fixer >= this.scrollUntil) {
		return;
	}

	for (var i = fixer; i >= 0; i--) {
		this.$sections.get(fixer).style["top"] = 0;
		this.$sections.get(i).style["position"] = "fixed";
		this.$sections.get(i).style["zIndex"] = fixer - this.l;
	}

	for (var i = fixer + 1; i < this.l; i++) {
		this.$sections.get(i).style["top"] = (i == this.l - 1 ? (i - 1) * this.h : i * this.h) + "px";
		this.$sections.get(i).style["position"] = "";
		this.$sections.get(i).style["zIndex"] = "";
	}
}