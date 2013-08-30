/*jshint strict: false, browser:true, jquery: true*/
var $w = $(window),
	$d = $(document);

var WindowSlider = function(selector, slideDesc) {
	var self = this;

	self.slideDesc = slideDesc;
	self.lastF = 0;
	self.h = null;
	self.dh = null;

	var slideNum = 0,
		skip = 0,
		$slides = $(selector);

	for(var i in slideDesc) {
		var slide = slideDesc[i];

		if(slide.children || skip <= 0) {
			slide.children ? skip = slide.children + 1 : false;
			slide.$b = $slides.eq(slideNum);
			slideNum++;
		}

		skip--;
	}

	$w
		.on("resize", function() {
			self.h = $w.height();
			self.dh = $d.height();
			self.manageSlideFixation(self.lastF);
		})
		.on("scroll", function() {
			var s = $w.scrollTop(),
				curF = Math.floor(s / self.h);
			if(curF >= 0 && curF !== self.lastF) {
				self.manageSlideFixation(curF);
				self.lastF = curF;
			}
		})
		.trigger("resize");
};

WindowSlider.prototype.manageSlideFixation = function (index) {
	var self = this,
		k;

	var currSlide = this.slideDesc[index];

	for(var i in this.slideDesc) {
		var slide = this.slideDesc[i];

		if(slide.$b) {
			if(i <= index && slide.fixed !== false) {
				slide.$b.css({
					top: 0,
					position: "fixed"
				});
			}

			if(i > index) {
				slide.$b.css({
					top: i * this.h + "px",
					position: ""
				});
			}
		}
	}

	if(!currSlide.$b) {
		self.slideDesc.splice(index, 1);
		$w.scrollTop(self.h * (index - 1));
	}

	if(currSlide.cb !== undefined) {
		setTimeout(function() {
			currSlide.cb();
		}, 100);
	}
};
