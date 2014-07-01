$(function makeImagesResponsive() {
  var isHDPI = window.devicePixelRatio && window.devicePixelRatio > 1;
  if(isHDPI) {
    $('img').each(function(i, el) {
        $(el).attr("src", el.src.replace(".jpg", "@2x.jpg"));
    });
  }
});