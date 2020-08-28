jQuery(function ($) {
  "use strict";




  /* ==========================================================================
    Lazy Loader
  =========================================================================== */

  // lazy loads elements with default selector as ".lozad"
  const observer = lozad();
  observer.observe();




  /* ==========================================================================
    Magnific Popup
  =========================================================================== */

  $('.image-popup').magnificPopup({
    type: 'image',
    removalDelay: 160, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
    closeOnContentClick: true,
    midClick: true,
    fixedContentPos: false,
    fixedBgPos: true
  });




  /* ==========================================================================
    Portfolio Filtering Hook
  =========================================================================== */

  var containerEl = document.querySelector('.shuffle-wrapper');
  if (containerEl) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
      itemSelector: '.shuffle-item',
      buffer: 1
    });

    jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });
  }




  /* ==========================================================================
    Testimonial Carousel
  =========================================================================== */

  $("#testimonials").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000
  });




  /* ==========================================================================
    Animation Scroll
  =========================================================================== */

  var html_body = $('html, body');
  $('nav a, .page-scroll').on('click', function () {
    //use page-scroll class in any HTML tag for scrolling
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        html_body.animate({
          scrollTop: target.offset().top - 50
        }, 1500, 'easeInOutExpo');
        return false;
      }
    }
  });

  // easeInOutExpo Declaration
  jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
      if (t === 0) {
        return b;
      }
      if (t === d) {
        return b + c;
      }
      if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  });




  /* ==========================================================================
    Google Maps
  =========================================================================== */

  $(window).marker = null;

  function initialize() {
    var map;
    var latitude = $('#map').attr('data-latitude');
    var longitude = $('#map').attr('data-longitude');
    var mapMarker = $('#map').attr('data-marker');
    var mapMarkerName = $('#map').attr('data-marker-name');
    var nottingham = new google.maps.LatLng(latitude, longitude);
    var style = [{
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{
        "saturation": 36
      }, {
        "color": "#000000"
      }, {
        "lightness": 40
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }, {
        "weight": 1.2
      }]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 20
      }]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 21
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 18
      }]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 16
      }]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 19
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }, {
        "lightness": 17
      }]
    }];
    var mapOptions = {
      center: nottingham,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      backgroundColor: "#000",
      zoom: 15,
      panControl: !1,
      zoomControl: !0,
      mapTypeControl: !1,
      scaleControl: !1,
      streetViewControl: !1,
      overviewMapControl: !1,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      }
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var mapType = new google.maps.StyledMapType(style, {
      name: "Grayscale"
    });
    map.mapTypes.set('grey', mapType);
    map.setMapTypeId('grey');
    var marker_image = mapMarker;
    var pinIcon = new google.maps.MarkerImage(marker_image, null, null, null, new google.maps.Size(46, 40));
    marker = new google.maps.Marker({
      position: nottingham,
      map: map,
      icon: pinIcon,
      title: mapMarkerName
    })
  }

  var map = document.getElementById('map');
  if (map != null) {
    google.maps.event.addDomListener(window, 'load', initialize)
  }




  /* ==========================================================================
    Counter Up
  =========================================================================== */

  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  $(window).on('scroll', function () {
    counter();
  });

});