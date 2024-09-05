$(document).ready(function () {
  console.log("ready!");
  // scrollHeader();
  animateTitleSection(".title-animation", ".hotels-sec__title", 136);
  animateTitleSection(".gallery-sec__title", ".gallery-sec__title", 136);
  animateTitleSection(".offer-sec__title", ".offer-sec__title", 133);
  animateTitleSectionRightLeft(".activities-sec", ".activities-sec__title");
  animateTitleSectionRightLeft(" .cruise-iti", ".cruise-iti__title");
  animateTitleSection(".floor-plane__title", ".floor-plane__title");
  animateTitleSectionRightLeft(".cruise__title", ".cruise__title", 90);
  animateTitleSectionRightLeft(".testimonial__title", ".testimonial__title");
  animateTitleSection(".facilities__container", ".facilities__title");

  animateTitleSection(".restaurant__title", ".restaurant__title", 70);
  animationLineVertical(".line-cap-hotel", ".line-hotels", "100%", 0.1, 72);

  swiperHotels();
  swiperHotelsDetail();
  swiperRestaurant();
  swiperOffer();
  cruise();
  testimonial();
  scrollVerticalFull();
  scrollHorizontal();
  animationLine();
  animtionFadeIn();
  swiperActivites();
  swiperOfferDetail();
});

function animtionFadeIn() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".data-fade-in").forEach((element, i) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          end: "bottom 70%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "sine.out",
        stagger: 0.1,
      }
    );
  });
}
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
          end: `+=${elementHeight - 120}`,
          scrub: true,
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
          start: "top 65%",
          end: "+=110",
          scrub: true,
          onComplete: () => {
            scrollVerticalFull();
          },
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
          $(".header__container").removeClass("scrolled-down");
        } else {
          $(".header__default").addClass("scrolled-down");
          $(".header__container").addClass("scrolled-down");
        }
      },
    });
  }

  initializeScrollTrigger();

  // Re-initialize ScrollTrigger when page is refreshed
  $(window).on("load", initializeScrollTrigger);
}
function animateTitleSection(sectionClass, triggerClass, endPointSVG = 113) {
  gsap.registerPlugin(ScrollTrigger);

  // Ensure the required elements exist
  const h2Element = document.querySelector(`${sectionClass} h2`);
  const svgElement = document.querySelector(`${sectionClass} .icon-wheel`);

  if ($(".title-keyframe").length && h2Element && svgElement) {
    const textSplit = new SplitType(`${sectionClass} h2`, { types: "chars" });
    const h2Width = h2Element.offsetWidth;
    const svgWidth = svgElement.offsetWidth;

    // Set the initial position and hide the SVG
    gsap.set(svgElement, {
      x: -(svgWidth + 50),
      visibility: "hidden",
    });
    gsap.set(`${sectionClass} .char`, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerClass,
        start: "top 67%",
        end: "bottom 67%",
        // markers: true,
        onEnter: function () {
          gsap.set(svgElement, { visibility: "visible" });
        },
      },
      onUpdate: function () {
        const progress = gsap.getProperty(svgElement, "x");
        document
          .querySelectorAll(`${sectionClass} h2 .char`)
          .forEach((char) => {
            if (progress >= char.offsetLeft) {
              gsap.to(char, { opacity: 1, duration: 0.1 });
            }
          });
      },
    });

    tl.to(svgElement, {
      x: h2Width + endPointSVG, // endPointSVG used directly
      rotation: 360,
      duration: 1,
      ease: "power2.inOut",
      onComplete: function () {
        gsap.to(svgElement, {
          opacity: 0,
          scale: 0.5,
          ease: "power1.inOut",
          onComplete: function () {
            gsap.set(svgElement, { visibility: "hidden" });
          },
        });
      },
    });
  }
}
function animateTitleSectionRightLeft(
  sectionClass,
  triggerClass,
  endPointSVG = 113
) {
  gsap.registerPlugin(ScrollTrigger);

  // Ensure the required elements exist
  const h2Element = document.querySelector(`${sectionClass} h2`);
  const svgElement = document.querySelector(`${sectionClass} .icon-wheel`);

  if ($(".title-keyframe").length && h2Element && svgElement) {
    const textSplit = new SplitType(`${sectionClass} h2`, { types: "chars" });
    const h2Width = h2Element.offsetWidth;
    const svgWidth = svgElement.offsetWidth;

    // Set the initial position and hide the SVG (start from the right side)
    gsap.set(svgElement, {
      x: h2Width + endPointSVG,
      visibility: "hidden",
    });
    gsap.set(`${sectionClass} .char`, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerClass,
        start: "top 60%",
        end: "bottom 60%",
        // markers: true,
        // scrub: true,
        onEnter: function () {
          gsap.set(svgElement, { visibility: "visible" });
        },
      },
      onUpdate: function () {
        const progress = gsap.getProperty(svgElement, "x");
        document
          .querySelectorAll(`${sectionClass} h2 .char`)
          .forEach((char) => {
            if (progress <= char.offsetLeft) {
              gsap.to(char, { opacity: 1, duration: 0.1 });
            }
          });
      },
    });

    tl.to(svgElement, {
      x: -(svgWidth + 50), // Move from right to left
      rotation: -360, // Adjust rotation direction
      duration: 1,
      ease: "power2.inOut",
      onComplete: function () {
        gsap.to(svgElement, {
          opacity: 0,
          scale: 0.5,
          ease: "power1.inOut",
          onComplete: function () {
            gsap.set(svgElement, { visibility: "hidden" });
          },
        });
      },
    });
  }
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
    const initializeSwiper = function () {
      $(".tab-pane.show .swiper-tab").each(function () {
        const swiperContainer = $(this);

        // Find the pagination element specifically for this swiper instance
        const paginationEl = swiperContainer
          .closest(".tab-pane")
          .find(".swiper-pagination");

        const swiperInstance = new Swiper(swiperContainer[0], {
          slidesPerView: 1.5,
          spaceBetween: 24,
          centeredSlides: true,
          loop: true,
          navigation: {
            nextEl: ".hotels-sec .swiper-button-next",
            prevEl: ".hotels-sec .swiper-button-prev",
          },
          pagination: {
            el: paginationEl[0], // Use the pagination element specific to this swiper
            type: "progressbar",
          },
          breakpoints: {
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
              centeredSlides: false,
              loop: false,
              navigation: {
                nextEl: ".hotels-sec .swiper-button-next",
                prevEl: ".hotels-sec .swiper-button-prev",
              },
            },
          },
        });

        function updateSlideCount() {
          // Only execute the logic for screens 768px and above
          if (window.innerWidth >= 768) {
            const activeSlideCount =
              swiperContainer.find(".swiper-slide").length;
            swiperContainer
              .closest(".tab-pane")
              .find(".swiper-arrows")
              .toggleClass("d-none", activeSlideCount <= 4);
          } else {
            // Ensure arrows are visible on smaller screens
            const activeSlideCount =
              swiperContainer.find(".swiper-slide").length;
            swiperContainer
              .closest(".tab-pane")
              .find(".swiper-arrows")
              .toggleClass("d-none", activeSlideCount <= 1);
          }
        }

        updateSlideCount();
      });
    };

    // Initialize Swiper on page load for the active tab
    initializeSwiper();

    // Reinitialize Swiper when a new tab is shown
    $('button[data-bs-toggle="tab"]').on("shown.bs.tab", initializeSwiper);
  }
}

function swiperHotelsDetail() {
  if ($(".hotels__slider .swiper-tab-detail").length) {
    if ($(".swiper-tab-detail").length && $(".nav-link.active").length) {
      const swiper = new Swiper(".swiper-tab-detail", {
        // Optional parameters
        direction: "horizontal",
        grabCursor: true,
        slidesPerView: 2,
        slidesPerGroup: 1,
        centeredSlides: false,
        loop: true,
        spaceBetween: 40,
        mousewheel: {
          forceToAxis: true,
        },
        pagination: {
          el: ".accommodation .swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          nextEl: ".hotels__slider  .swiper-button-next",
          prevEl: ".hotels__slider  .swiper-button-prev",
        },
        speed: 700,
        slideActiveClass: "is-active",
        slideDuplicateActiveClass: "is-active",
      });

      function updateSlideCount() {
        const activeSlideCount = $(
          ".tab-pane.show .swiper-tab-detail .swiper-slide"
        ).length;
        $(".hotels-sec .swiper-arrows").toggleClass(
          "d-none",
          activeSlideCount <= 2
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
      simulateTouch: false,
      mousewheelControl: false,
      keyboardControl: false,
      mousewheel: false,
      keyboard: false,
      pagination: {
        el: ".restaurant__image .swiper-pagination",
        type: "progressbar",
      },
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

    var swiperResContent = new Swiper(".swiper-res-content", {
      effect: "fade",
      simulateTouch: false,
      mousewheelControl: false,
      keyboardControl: false,
      loop: true,
      navigation: {
        nextEl: ".restaurant__content .swiper-button-next",
        prevEl: ".restaurant__content .swiper-button-prev",
      },
      breakpoints: {
        768: {
          effect: "fade",
          simulateTouch: false,
          mousewheelControl: false,
          keyboardControl: false,
          loop: true,
        },
        navigation: {
          nextEl: ".restaurant__content .swiper-button-next",
          prevEl: ".restaurant__content .swiper-button-prev",
        },
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
function swiperActivites() {
  // swiper facility img
  var interleaveOffsetAct = 0.9;
  if ($(".act-img").length) {
    var swiperActImg = new Swiper(".act-img", {
      loop: true,
      speed: 1200,
      grabCursor: false,
      watchSlidesProgress: true,
      watchSlidesProgress: true,
      simulateTouch: false,
      mousewheelControl: false,
      keyboardControl: false,
      pagination: {
        el: ".activities-sec .swiper-pagination",
        type: "progressbar",
      },
      on: {
        progress: function (swiper) {
          swiper.slides.forEach(function (slide) {
            var slideProgress = slide.progress || 0;
            var innerOffset = swiper.width * interleaveOffsetAct;
            var innerTranslate = slideProgress * innerOffset;
            // Kiểm tra nếu innerTranslate không phải là NaN
            if (!isNaN(innerTranslate)) {
              var slideInner = slide.querySelector(".swiper-img-act");
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
            var slideInner = slide.querySelector(".swiper-img-act");
            if (slideInner) {
              slideInner.style.transition = speed + "ms " + easing;
            }
          });
        },
      },
    });

    var swiperActContent = new Swiper(".act-content", {
      effect: "fade",
      simulateTouch: false,
      mousewheelControl: false,
      keyboardControl: false,
      loop: true,
      navigation: {
        nextEl: ".activities-sec .swiper-button-next",
        prevEl: ".activities-sec .swiper-button-prev",
      },
      thumbs: {
        swiper: swiperActImg,
      },
      fadeEffect: {
        crossFade: true,
      },
    });
  }
}

function swiperOfferDetail() {
  // swiper facility img
  var interOffset = 0.9;
  if ($(".swiper-offer-detail").length) {
    var swiperActImg = new Swiper(".swiper-offer-detail", {
      loop: true,
      speed: 1200,
      watchSlidesProgress: true,
      watchSlidesProgress: true,
      // simulateTouch: false,
      mousewheelControl: false,
      keyboardControl: false,
      pagination: {
        el: ".offer-content .swiper-pagination",
        type: "progressbar",
      },
      on: {
        progress: function (swiper) {
          swiper.slides.forEach(function (slide) {
            var slideProgress = slide.progress || 0;
            var innerOffset = swiper.width * interOffset;
            var innerTranslate = slideProgress * innerOffset;
            // Kiểm tra nếu innerTranslate không phải là NaN
            if (!isNaN(innerTranslate)) {
              var slideInner = slide.querySelector(".swiper-img-offer");
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
            var slideInner = slide.querySelector(".swiper-img-offer");
            if (slideInner) {
              slideInner.style.transition = speed + "ms " + easing;
            }
          });
        },
      },
    });

    var swiperActContent = new Swiper(".act-content", {
      effect: "fade",
      simulateTouch: false,
      mousewheelControl: false,
      keyboardControl: false,
      loop: true,
      navigation: {
        nextEl: ".activities-sec .swiper-button-next",
        prevEl: ".activities-sec .swiper-button-prev",
      },
      thumbs: {
        swiper: swiperActImg,
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
        el: ".offer-sec .swiper-pagination",
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
        // onLeaveBack: () => el.classList.remove("active"), // Remove class when scrolling back up
      });
    });
  }
  if ($(".testimonial__animation").length) {
    gsap.utils.toArray(".testimonial__animation").forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        end: "bottom 75%",
        onEnter: () => el.classList.add("active"), // Add class when entering the viewport
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
        start: "top 74%",
        end: "bottom 70%",
        onEnter: () => el.classList.add("active"), // Add class when entering the viewport
        onLeaveBack: () => el.classList.remove("active"), // Remove class when scrolling back up
      });
    });
  }
  ScrollTrigger.refresh();
}
