$(function() {
  var vph, vpw, header, page1, page2, page3, page4, page1Height, page2Height, page3Height;
  vpw = $(window).width();
  vph = $(window).height();
  header = $('.header');
  car = $('.logo img');
  liOne = $('li.one');
  liTwo = $('li.two');
  liThree = $('li.three');
  liFour = $('li.four');
  page1 = $('.page1');
  page2 = $('.page2');
  page3 = $('.page3');
  page4 = $('.page4');
  page1Height = page1.innerHeight();
  page2Height = page2.innerHeight();
  page3Height = page3.innerHeight();
  // pointer = $('.pointer');
  // iphone1Ofsset = page1.offset().top;

  header.height(vph);

  $(window).resize(function() {
    vph = $(window).height();
    header.height(vph);
    page1Height = page1.innerHeight();
    page2Height = page2.innerHeight();
    page3Height = page3.innerHeight();
  });

  car.on({
    click: function() {
      $(this).addClass('clicked');
      setTimeout(function() {
        car.removeClass('clicked');
      }, 100);
    }
  });

  liOne.on({
    click: function() {
      $('body, html').animate({
        scrollTop: page1.offset().top + 1
      }, 250);
    }
  });

  liTwo.on({
    click: function() {
      $('body, html').animate({
        scrollTop: page2.offset().top
      }, 250);
    }
  });

  liThree.on({
    click: function() {
      $('body, html').animate({
        scrollTop: page3.offset().top
      }, 250);
    }
  });

  liFour.on({
    click: function() {
      $('body, html').animate({
        scrollTop: page4.offset().top
      }, 250);
    }
  });

  page1.addClass('active'); liOne.addClass('active');

  $(window).on('scroll', function() {
    if ($(window).width() > 520) {
      setTimeout(function() {
        var scrollTop = $(document).scrollTop();
        //page1
        page1.addClass('active'); liOne.addClass('active');
        if (scrollTop > page1Height - page1Height/6) { page1.removeClass('active'); liOne.removeClass('active'); } 
        //page2
        if (scrollTop > page1Height - page1Height/6 && scrollTop < page1Height + page2Height - page2Height/6) { page2.addClass('active'); liTwo.addClass('active'); }
        if (scrollTop > page1Height + page2Height - page2Height/6 || scrollTop < page1Height - page1Height/6) { page2.removeClass('active'); liTwo.removeClass('active'); }
        //page3
        if (scrollTop > page1Height + page2Height - page2Height/6 && scrollTop < page1Height + page2Height + page3Height - page3Height/4) { page3.addClass('active'); liThree.addClass('active'); }
        if (scrollTop > page1Height + page2Height + page3Height - page3Height/4 || scrollTop < page1Height + page2Height - page2Height/6) { page3.removeClass('active'); liThree.removeClass('active'); }
        //page4
        if (scrollTop > page1Height + page2Height + page3Height - page3Height/4) { page4.addClass('active'); liFour.addClass('active'); }
        if (scrollTop < page1Height + page2Height + page3Height - page3Height/4) { page4.removeClass('active'); liFour.removeClass('active'); }
      }, 50);
    }
  });
});