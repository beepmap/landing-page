var transition = Modernizr.prefixed("transition");
var transform = Modernizr.prefixed("transform");
var Slideshow = function ($container) {
    var self = this;
    self.$w = $(window);
    self.$b = $container;
    self.$carousel = $container.find("ul");
    self.$slideList = $container.find("li");
    self.$bottomCtrl = undefined;
    self.windowWidth = undefined;
    self.slideWidth = undefined;
    self.currentSlide = undefined;
    self.leftCtrl = undefined;
    self.rightCtrl = undefined;
    self.isMobile = function() {
        var platformIdentifier = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            }
        };
        return (platformIdentifier.Android() || platformIdentifier.BlackBerry() || platformIdentifier.iOS() || platformIdentifier.Opera() || platformIdentifier.Windows());
    }();

    if (self.isMobile) {
        self.buildMobile();
    } else {
        self.buildDesktop();
    }

    $(window).on("resize", function() {
        self.windowWidth = self.$w.width();
        self.slideWidth = self.$slideList.width();
        self.show(undefined, true);
    }).trigger("resize");
};

Slideshow.prototype = {
    show: function (id, isSimple) {
        var self = this;

        if (id === undefined) {
            id = self.currentSlide || 0;
        } 

        if (id < 0 || id >= self.$slideList.length) return;

        if (Modernizr.csstransitions) {
            self.moveTransition(id, isSimple);
        } else {
            self.moveAnimation(id, isSimple);
        }

        setTimeout(function() {
            self.currentSlide = id;
        }, self.isMobile ? 150 : 600);
    },

    activateCtrl: function (id) {
        var self = this;

        self.$bottomCtrl.find(".active").removeClass("active");
        self.$bottomCtrl.find("[data-slide=" + id + "]").addClass("active");
    },

    moveTransition: function(id, isSimple) {
        var self = this;
        this.$slideList.each(function(i, el) {
            el.style[transition] = isSimple ? "none" : ("all 600ms " + (self.isMobile ? "ease-out" : "cubic-bezier(0.860, 0.000, 0.070, 1.000)"));
            el.style[transform] = 'translate(' + (i - id) * (self.slideWidth + 20) + 'px, 0)';
        });
    },

    moveAnimation: function(id, isSimple) {
        var self = this;
        this.$slideList.each(function(i, el) {
            if (isSimple) {
                $(el).css("left", + (i - id) * (self.slideWidth + 20) + self.windowWidth / 2 + 'px');
            } else {
                $(el).animate({
                    left: + (i - id) * (self.slideWidth + 20) + self.windowWidth / 2 + 'px'
                }, 600, 'easeInOutCubic');
            }
        });
    },

    buildDesktop: function() {
        var self = this,
            controls = "<div class='controls left-ctrl'></div>" +
                "<div class='controls right-ctrl'></div>" +
                "<div class='controls bottom-ctrl'><ul class='table'></ul></div>";


        self.$bottomCtrl = self.$b.prepend(controls).find(".bottom-ctrl ul");

        self.$slideList.each(function (i, el) {
            self.$bottomCtrl.append("<li data-slide='" + i + "'><span></span></li>");
        })

        self.$bottomCtrl.on("click", "li", function(e, isSimple) {
            e.preventDefault();

            var slide = parseInt($(this).data("slide"));

            self.show(slide, isSimple);
            self.activateCtrl(slide);
        });

        self.$b.on("click", ".left-ctrl, .right-ctrl", function() {
            var slide = self.currentSlide + ($(this).hasClass("left-ctrl") ? -1 : 1);

            self.show(slide);
            self.activateCtrl(slide);
        });

        this.$bottomCtrl.find("li:first").trigger("click", [true]);
    },

    buildMobile: function() {
        var self = this,
            x1, shiftX, y1, shiftY,
            currentX = [];

        self.$carousel.addClass('slider-touch');

        self.$slideList.each(function(i, el) {
            $(el).css({
                '-webkit-transition':'none',
                '-webkit-transform': 'translate(' + (i - self.currentSlide) * self.slideWidth + 'px, 0)'
            });
        });

        self.$carousel.
            on({
                'touchstart.slider': function(e) {
                    e.preventDefault();

                    var eo = e.originalEvent.touches[0];
                    x1 = eo.pageX;
                    y1 = eo.pageY;
                    self.$slideList.css('-webkit-transition', 'none');
                },

                'touchmove.slider': function(e) {
                    e.preventDefault();

                    var eo = e.originalEvent.touches[0];
                    shiftX = eo.pageX - x1;
                    shiftY = eo.pageY - y1;

                    self.$slideList.each(function(i, el){
                        var $el = $(el);
                        if(!currentX[i]) {
                            currentX[i] = (new window.WebKitCSSMatrix(getComputedStyle(el).webkitTransform)).m41;
                        }
                        $el.css('-webkit-transform', 'translate(' + (currentX[i] + shiftX ) + 'px, 0)');
                    });

                    if(Math.abs(shiftX) > 5 && Math.abs(shiftY) > 5) {
                        e.preventDefault();
                    }
                },

                'touchend.slider': function(e) {
                    if (Math.abs(shiftX) > self.slideWidth / 4) {
                        var newSlide = self.currentSlide + (shiftX > 0 ? -1 : 1);
                        if(newSlide >= 0 && newSlide < self.$slideList.length) {
                            self.show(newSlide);
                        } else {
                            self.show();
                        }
                    } else {
                        self.show();
                    }

                    x1 = shiftX = undefined;
                    currentX = [];
                },

                'touchcancel.slider': function(e) {
                    x1 = shiftX = undefined;
                    currentX = [];
                }
            });
    }
}
