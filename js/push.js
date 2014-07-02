(function() {
  // detect if IE : from http://stackoverflow.com/a/16657946    
  var ie = (function(){
    var undef,rv = -1; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
      // IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rvNum = ua.indexOf('rv:');
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return ((rv > -1) ? rv : undef);
  }());

  var keys = [32, 37, 38, 39, 40], wheelIter = 0;

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
    e.preventDefault();
    e.returnValue = false;  
  }

  function keydown(e) {
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }

  function touchmove(e) {
    preventDefault(e);
  }

  function disable_scroll() {
    window.onmousewheel = document.onmousewheel;
    document.onkeydown = keydown;
    document.body.ontouchmove = touchmove;
  }

  function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
  }

  var docElem = window.document.documentElement,
    scrollVal,
    isRevealed, 
    noscroll, 
    isAnimating,
    container = document.getElementById( 'container' ),
    trigger = container.querySelector( '.trigger' );

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }
  
  function scrollPage() {
    scrollVal = scrollY();
    
    if( noscroll && !ie ) {
      if( scrollVal < 0 ) return false;
      // keep it that way
      window.scrollTo( 0, 0 );
    }

    if( classie.has( container, 'notrans' ) ) {
      classie.remove( container, 'notrans' );
      return false;
    }

    if( isAnimating ) {
      return false;
    }
    if( scrollVal <= 0 && isRevealed ) {
      toggle(0);
    } else if( scrollVal > 0 && !isRevealed ){
      toggle(1);
    }
  }

  function toggle( reveal ) {
    isAnimating = true;
    
    if( reveal ) {
      classie.add( container, 'modify' );
      $('body, html').scrollTop(1);
    }
    else {
      noscroll = true;
      disable_scroll();
      classie.remove( container, 'modify' );
    }

    // simulating the end of the transition:
    setTimeout( function() {
      isRevealed = !isRevealed;
      isAnimating = false;
      if( reveal ) {
        noscroll = false;
        enable_scroll();
      }
    }, 1200 );
  }

  // refreshing the page...
  var pageScroll = scrollY();
  noscroll = pageScroll === 0;
  
  disable_scroll();
  
  if( pageScroll ) {
    isRevealed = true;
    classie.add( container, 'notrans' );
    classie.add( container, 'modify' );
  }
  

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
    window.addEventListener( 'scroll', function() {
      if( $(window).scrollTop() > 0 && isRevealed ) { 
        window.addEventListener( 'scroll', scrollPage );
      }
    });
    $(window).on("orientationchange", function(){
      if( !isRevealed ) {
        $(document).scrollTop(0);
        window.removeEventListener( 'scroll', scrollPage );
      } else {
        window.removeEventListener( 'scroll', scrollPage );
      }
    });
  } else {
    window.addEventListener( 'scroll', scrollPage );
  }
  trigger.addEventListener( 'click', function() { 
    toggle( 'reveal' );
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setTimeout( function() {
        window.addEventListener( 'scroll', scrollPage );
      }, 1200 );
    }
  } );
})();