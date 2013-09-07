/*jshint strict: false, browser:true, jquery: true*/
var $w = $(window),
	$d = $(document);

var WindowSlider = function(selector, slideDesc) {
	var self = this;

	self.slideDesc = slideDesc;
	self.lastF = 0;
	self.h = null;

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
				self.lastF = curF;
				self.manageSlideFixation(curF);
			}
		})
		.trigger("resize");
};

WindowSlider.prototype.manageSlideFixation = function (index) {
	var i, currSlide = this.slideDesc[index];

	if (currSlide.stopFix && this.slideDesc[index + 1].$b) {
		var k = 0;
		for (i = index; i < this.slideDesc.length; i++) {
			this.slideDesc[i].$b.css({
				top: index * this.h  + "px",
				position: ""
			});
		}
	} else {
		for(i in this.slideDesc) {
			var slide = this.slideDesc[i];

			if(slide.$b) {
				if(i <= index) {
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
	}

	if(!currSlide.$b) {
		this.slideDesc.splice(index, 1);
		$w.scrollTop(this.h * (index - 1));
	}

	if(currSlide.cb !== undefined) {
		setTimeout(function() {
			currSlide.cb();
			delete currSlide.cb;
		}, 100);
	}
};
