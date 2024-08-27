$(document).ready(function () {
  console.log("ready!");
  scrollHeader();
  animateTitleSection(".title-animation", ".hotels-sec__title", 1.9);
  animateTitleSection(".offer-sec__title", ".offer-sec__title", 1.9);
  animateTitleSection(".cruise__title", ".cruise__title", 1.1);
  animateTitleSection(".testimonial__title", ".testimonial__title", 1.1);
  animateTitleSection(".restaurant__title", ".restaurant__title", 1.5);
  animationLineVertical(".line-cap-hotel", ".line-hotels", "100%", 0.1, 75);

  swiperHotels();
  swiperRestaurant();
  swiperOffer();
  cruise();
  testimonial();
  scrollVerticalFull();
  scrollHorizontal();
  animationLine();
});
function scrollVerticalFull() {
  gsap.registerPlugin(ScrollTrigger);
  var lineVertical = $(".lines-vertical");

  lineVertical.each(function (index, element) {
    var elementHeight = $(element).height();
    gsap.fromTo(
      element,
      { height: "0%" },
      {
        height: "100%",
        scrollTrigger: {
          trigger: element,
          start: "top 50%",
          end: `+=${elementHeight - 100}`,
          scrub: true,
          onComplete: () => {
            scrollHorizontal(); // Trigger horizontal scroll after vertical is complete
          },
        },
      }
    );
  });
}
function scrollHorizontal() {
  gsap.registerPlugin(ScrollTrigger);
  var lineHorizontal = $(".lines-horizontal");

  lineHorizontal.each(function (index, element) {
    gsap.fromTo(
      element,
      { width: "0%" },
      {
        width: "100%",
        scrollTrigger: {
          trigger: element,
          start: "top 60%", // Adjusted start position
          end: "+=64",
          scrub: true, // Enable scrub for a smooth animation
          // markers: true,
        },
      }
    );
  });
}
function scrollHeader() {
  gsap.registerPlugin(ScrollTrigger);
  let height = $(".header__active").height() * -1;
  function initializeScrollTrigger() {
    navTop = gsap
      .from(".header__active", {
        y: height,
        paused: true,
        duration: 0.5,
        ease: "power1.out",
        trigger: "header",
      })
      .progress(1);

    ScrollTrigger.create({
      // start: "top top",
      start: "30vh top",
      end: 99999,
      onUpdate: (self) => {
        // Shrink navTop
        self.direction === -1 ? navTop.play() : navTop.reverse();
        // self.refresh();
        if (self.direction === -1) {
          $(".header__default").removeClass("scrolled-down");
        } else {
          $(".header__default").addClass("scrolled-down");
        }
      },
    });
  }

  initializeScrollTrigger();

  // Re-initialize ScrollTrigger when page is refreshed
  $(window).on("load", initializeScrollTrigger);
}
function animateTitleSection(sectionClass, triggerClass, endPointSVG) {
  gsap.registerPlugin(ScrollTrigger);

  const textSplit = new SplitType(`${sectionClass} h2`, { types: "chars" });
  const h2Width = document.querySelector(`${sectionClass} h2`).offsetWidth;
  const svgWidth = document.querySelector(
    `${sectionClass} .icon-wheel`
  ).offsetWidth;

  gsap.set(`${sectionClass} .icon-wheel`, {
    x: -svgWidth / 2,
    visibility: "visible",
  });
  gsap.set(`${sectionClass} .char`, { opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerClass,
      start: "top 55%",
      end: "bottom 55%",
      // markers: true,
    },
    onUpdate: function () {
      const progress = gsap.getProperty(`${sectionClass} .icon-wheel`, "x");
      document.querySelectorAll(`${sectionClass} h2 .char`).forEach((char) => {
        if (progress >= char.offsetLeft) {
          gsap.to(char, { opacity: 1, duration: 0.1 });
        }
      });
    },
  });

  tl.to(`${sectionClass} .icon-wheel`, {
    x: h2Width + svgWidth * `${endPointSVG}`,
    rotation: 360,
    duration: 1,
    ease: "power2.inOut",
    onComplete: function () {
      gsap.to(`${sectionClass} .icon-wheel`, {
        opacity: 0,
        scale: 0.5,
        ease: "power1.inOut",
        onComplete: function () {
          gsap.set(`${sectionClass} .icon-wheel`, { visibility: "hidden" });
        },
      });
    },
  });
}
function animationLineVerticalFull(
  sectionClass,
  triggerClass,
  height,
  duration = 1,
  vh = 70
) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    `${sectionClass}`,
    { height: "0%" },
    {
      height: `${height}`,
      duration: duration,
      scrollTrigger: {
        trigger: `${triggerClass}`,
        start: `top ${vh}%`,
        end: `bottom ${vh}%`,
        scrub: true,
      },
    }
  );
}
function animationLineVertical(
  sectionClass,
  triggerClass,
  height,
  duration = 0.1,
  vh = 70
) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    `${sectionClass}`,
    { height: "0%" },
    {
      height: `${height}`,
      duration: duration,
      scrollTrigger: {
        trigger: `${triggerClass}`,
        start: `top ${vh}%`,
        end: `top ${vh}%+=500`,
        scrub: 0.5,
      },
    }
  );
}
function animationLineHorizontal(
  sectionClass,
  triggerClass,
  width,
  duration = 0.1,
  vh = 86
) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    `${sectionClass}`,
    { width: "0%" },
    {
      width: `${width}`,
      duration: duration,
      delay: 1.5,
      scrollTrigger: {
        trigger: `${triggerClass}`,
        start: `top ${vh}%`,
        end: `top ${vh}%+=150`,
        scrub: 2,
        // markers: true,
      },
    }
  );
}

function swiperHotels() {
  if ($(".hotels-sec .swiper-tab").length) {
    if ($(".swiper-tab").length && $(".nav-link.active").length) {
      const swiperTab = new Swiper(".swiper-tab", {
        slidesPerView: 4,
        spaceBetween: 40,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });

      function updateSlideCount() {
        const activeSlideCount = $(
          ".tab-pane.show .swiper-tab .swiper-slide"
        ).length;
        $(".hotels-sec .swiper-arrows").toggleClass(
          "d-none",
          activeSlideCount <= 4
        );
      }

      updateSlideCount();
      $('button[data-bs-toggle="tab"]').on("shown.bs.tab", updateSlideCount);
    }
  }
}

function swiperRestaurant() {
  // swiper facility img
  var interleaveOffset = 0.9;
  if ($(".swiper-restaurant").length) {
    var swiperResImg = new Swiper(".swiper-restaurant", {
      loop: true,
      speed: 1200,
      grabCursor: false,
      watchSlidesProgress: true,
      watchSlidesProgress: true,
      simulateTouch: false,
      mousewheelControl: false,
      keyboardControl: false,
      on: {
        progress: function (swiper) {
          swiper.slides.forEach(function (slide) {
            var slideProgress = slide.progress || 0;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            // Kiểm tra nếu innerTranslate không phải là NaN
            if (!isNaN(innerTranslate)) {
              var slideInner = slide.querySelector(".swiper-img");
              if (slideInner) {
                slideInner.style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }
            }
          });
        },
        touchStart: function (swiper) {
          swiper.slides.forEach(function (slide) {
            slide.style.transition = "";
          });
        },
        setTransition: function (swiper, speed) {
          var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
          swiper.slides.forEach(function (slide) {
            slide.style.transition = speed + "ms " + easing;
            var slideInner = slide.querySelector(".swiper-img");
            if (slideInner) {
              slideInner.style.transition = speed + "ms " + easing;
            }
          });
        },
      },
    });

    var swiperResCotent = new Swiper(".swiper-res-content", {
      effect: "fade",
      simulateTouch: false,
      mousewheelControl: false,
      keyboardControl: false,
      navigation: {
        nextEl: ".swiper-res-content .swiper-button-next",
        prevEl: ".swiper-res-content .swiper-button-prev",
      },
      thumbs: {
        swiper: swiperResImg,
      },
      fadeEffect: {
        crossFade: true,
      },
    });
  }
}

function swiperOffer() {
  if ($(".offer-sec").length) {
    const swiperOffer = new Swiper(".swiper-offer", {
      slidesPerView: 3,
      spaceBetween: 40,
      pagination: {
        el: ".offer__container .swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".offer-sec .swiper-button-next",
        prevEl: ".offer-sec .swiper-button-prev",
      },
    });
  }
}

function cruise() {
  gsap.registerPlugin(ScrollTrigger);
  if ($(".cruise").length) {
    gsap.utils.toArray(".cruise-stroke").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 70%",
        onEnter: () => el.classList.add("active"), // Add class when entering the viewport
        // onLeaveBack: () => el.classList.remove("active"), // Remove class when scrolling back up
      });
    });
  }
  ScrollTrigger.refresh();
}
function testimonial() {
  gsap.registerPlugin(ScrollTrigger);
  if ($(".testimonial__list").length) {
    gsap.utils.toArray(".testimonial__list").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => el.classList.add("active"), // Add class when entering the viewport
        onLeaveBack: () => el.classList.remove("active"), // Remove class when scrolling back up
      });
    });
  }
  ScrollTrigger.refresh();
}
function animationLine() {
  gsap.registerPlugin(ScrollTrigger);
  if ($(".animation-line").length) {
    gsap.utils.toArray(".animation-line").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 70%",
        onEnter: () => el.classList.add("active"), // Add class when entering the viewport
        onLeaveBack: () => el.classList.remove("active"), // Remove class when scrolling back up
      });
    });
  }
  ScrollTrigger.refresh();
}
