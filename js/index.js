/// <reference types="../@types/jquery" />
const allCaption = document.querySelectorAll('.booking-info .light-box a');
const currentDate = new Date().getFullYear();
const alllinks = document.querySelectorAll('.nav-link');
const yearElement = (document.getElementById('year').innerHTML += currentDate);
const day = document.querySelector('.day');
const hr = document.querySelector('.hrs');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');

$(document).ready(function () {
  // Start Loding
  $('.loader').fadeOut(4000, function () {
    $('#loding').slideUp(2000, function () {
      // Set Body Overflow
      $('body').css('overflow', 'auto');
      // Start Hero Secion
      slideHeroSecion();
      /*Scroll Animation behavior */
      $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        let sectionName = e.target.getAttribute('href');
        $('body,html').animate(
          {
            scrollTop:
              $(`${sectionName}`).offset().top - $('nav').innerHeight(),
          },
          1000
        );
      });

      $(window).on('scroll', function () {
        // Scrolling Animation
        animationScrolling();
      });
    });
  });

  //* Start Animation Card
  animationCardPart();
  /* Event Counter */
  setInterval(() => {
    calculateRemainingTime();
  }, 1000);
  calculateRemainingTime();

  // ! =============> Fire Animation Plugins  ===============>
  AOS.init();
  // ? =============> Fire Hover Animation Of Card ===============>
  $('.discography .card figure').hover(
    function () {
      handlerIn(this);
    },
    function () {
      handlerOut(this);
    }
  );
  // ? =============> Aimation Plugins Slick ===============>

  $('.artist').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0px',

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerPadding: '0px',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerPadding: '0px',
          slidesToShow: 1,
        },
      },
    ],
  });

  $('.single-item').slick({
    dots: true,
    infinite: true,
    arrows: false,
  });

  $('.responsive').slick({
    dots: false,
    infinite: true,
    speed: 300,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });
  // ? =============>  Light-box Plugin ===============>
  Fancybox.bind('[data-fancybox]');
});

// ! =============> Function ===============>

// Function Counter Animation
function animateCounter($counter, maxValue) {
  let current = +$counter.html().split('+')[0];
  setInterval(() => {
    if (current >= maxValue) {
      return;
    }
    current++;
    $counter.html(`${current}+`);
  }, 10);
}
// Hover Function Card
function handlerIn(e) {
  const selcetor = $(e).find('.overlay-content .inner-content');
  $(selcetor).parent().css('background-color', ' rgba(0, 0, 0, 0.5)');
  $(selcetor)
    .find('h2')
    .slideDown(500, function () {
      $(selcetor)
        .find('p')
        .slideDown(500, function () {
          $(selcetor).find('button').slideDown(800);
        });
    });
}
function handlerOut(e) {
  const selcetor = $(e).find('.overlay-content .inner-content');
  $(selcetor).parent().css('background-color', ' transparent');
  $(selcetor)
    .find('h2')
    .slideUp(500, function () {
      $(selcetor)
        .find('p')
        .slideUp(500, function () {
          $(selcetor).find('button').slideUp(800);
        });
    });
}
// Change data-caption Discription
allCaption.forEach((caption) => {
  caption.setAttribute('data-caption', caption.href.split('img/')[1]);
});

// Toggle Class Active Anchor
alllinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    document.querySelector('.nav-link.active').classList.remove('active');
    this.classList.add('active');
  });
});

// Function to calculate the remaining time
function calculateRemainingTime() {
  const eventDate = new Date('2024-03-25');
  eventDate.setDate(eventDate.getDate());
  const currentTime = new Date();
  const timeDifference = eventDate.getTime() - currentTime.getTime();
  const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const remainingMinutes = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  day.innerHTML = `day ${remainingDays}`;
  hr.innerHTML = `Hours ${remainingHours * 24}`;
  min.innerHTML = `Minutes ${remainingMinutes}`;
  sec.innerHTML = `Seconds ${remainingSeconds}`;
}

// SlideAnimation Card
function animationCardPart() {
  $('.card').eq(0).animate({ height: 'toggle' }, 3000);
  $('.card').eq(1).animate({ height: 'toggle' }, 3000);
  $('.card')
    .eq(2)
    .animate({ height: 'toggle' }, 3000, function () {
      $('.card').eq(3).animate({ height: 'toggle' }, 3000);
      $('.card').eq(4).animate({ height: 'toggle' }, 3000);
      $('.card').eq(5).animate({ height: 'toggle' }, 3000);
    });
}

// SlideDown Hero Sections
function slideHeroSecion() {
  $('#hero').slideDown(3000, function () {
    $(this).addClass('d-flex');
    $('.animation').slideDown(2000);
  });
}

// All Animation When I Scrolling
function animationScrolling() {
  const cuurentPostion = $(window).scrollTop();
  const elementPostion = $('#event').offset().top;
  const postionAbout = $('#about').offset().top;

  //* Change BackGround Nav When i Scrolling
  if (cuurentPostion > elementPostion - $('nav').innerHeight()) {
    $('nav').css({ background: '#262626DB' });
    $('nav .container').css('padding-inline', '3rem');
  } else {
    $('nav').css({ background: 'transparent' });
    $('nav .container').css('padding-inline', '12px');
  }

  //* get Current Scroll At Section To Add Class Active To Anchor
  let scrollPosition = $(this).scrollTop();
  $('section').each(function () {
    let prevId = $(this).attr('id');
    let sectionTop = $(this).offset().top - $('nav').innerHeight();
    let sectionBottom = sectionTop + $(this).outerHeight();

    //* Check if the scroll position is within the current section
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      //* Get the id of the current section and log it
      let currentId = $(this).attr('id');
      $(`a[href^="#${currentId}"]`).addClass('active');
    } else {
      prevId = $(this).attr('id');
      $(`a[href^="#${prevId}"]`).removeClass('active');
    }

    //* Start Animation Counter Slider

    if (cuurentPostion > postionAbout) {
      $('.num')
        .eq(0)
        .slideDown(1000, function () {
          animateCounter($('#about .num span').eq(0), 15);
          $('.num')
            .eq(1)
            .slideDown(1000, function () {
              animateCounter($('#about .num span').eq(1), 50);
              $('.num')
                .eq(2)
                .slideDown(1000, function () {
                  animateCounter($('#about .num span').eq(2), 800);
                  $('.num')
                    .eq(3)
                    .slideDown(1000, function () {
                      animateCounter($('#about .num span').eq(3), 700);
                    });
                });
            });
        });
    }
  });
}
