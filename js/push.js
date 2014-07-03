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
    isRevealed = false, 
    noscroll, 
    isAnimating,
    touchDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
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
    console.log(isRevealed);
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
  

  if( touchDevices ) {
    $(window).on("orientationchange", function(event){
      if( !isRevealed && event.orientation === 'landscape') {
        $(document).scrollTop(0);
        console.log('scrolled');
        window.removeEventListener( 'scroll', scrollPage );
        console.log('event listener removed 1');
      } else if( isRevealed ) {
        window.removeEventListener( 'scroll', scrollPage );
        if (isRevealed) {
          window.addEventListener( 'touchmove', function() {
            console.log('event listener added by touch');
            window.addEventListener( 'scroll', scrollPage );
          });
        }
      }
    });
  } else {
    window.addEventListener( 'scroll', scrollPage );
  }
  trigger.addEventListener( 'click', function() { 
    toggle( 'reveal' );
    if( touchDevices ) {
      setTimeout( function() {
        window.addEventListener( 'scroll', scrollPage );
      }, 1200 );
    }
  } );
})();