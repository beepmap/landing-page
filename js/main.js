$(function() {
  var vph, vpw, header;
  vpw = $(window).width();
  vph = $(window).height();
  header = $('.header');
  // article = $('article');
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
  page4Height = page4.innerHeight();
  // pointer = $('.pointer');
  // iphone1Ofsset = page1.offset().top;
  space = $('.space').height();

  header.height(vph);
  // article.height(vph);

  $(window).resize(function() {
    vph = $(window).height();
    header.height(vph);
    // article.height(vph);
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
      $('html, body').animate({
        scrollTop: 1
      }, 250);
    }
  });

  liTwo.on({
    click: function() {
      $('html, body').animate({
        scrollTop: page1Height
      }, 250);
    }
  });

  liThree.on({
    click: function() {
      $('html, body').animate({
        scrollTop: page1Height + page2Height
      }, 250);
    }
  });

  liFour.on({
    click: function() {
      $('html, body').animate({
        scrollTop: page1Height + page2Height + page3Height
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
        if (scrollTop > page1Height + page2Height - page2Height/6 && scrollTop < page1Height + page2Height + page3Height - page3Height/6) { page3.addClass('active'); liThree.addClass('active'); }
        if (scrollTop > page1Height + page2Height + page3Height - page3Height/6 || scrollTop < page1Height + page2Height - page2Height/6) { page3.removeClass('active'); liThree.removeClass('active'); }
        //page4
        if (scrollTop > page1Height + page2Height + page3Height - page3Height/6) { page4.addClass('active'); liFour.addClass('active'); }
        if (scrollTop < page1Height + page2Height + page3Height - page3Height/6) { page4.removeClass('active'); liFour.removeClass('active'); }
      }, 50);
    }
  });
});