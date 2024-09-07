$(document).ready(function () {
  console.log("ready!");
  // scrollHeader();
  animateTitleSection();
  animateTitleSectionRightLeft();
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
  bookingForm();
  intro();
  menuMobile();
});

function menuMobile() {
  $(".header__hamburger").on("click", function () {
    // Xóa class 'active' của sub-menu nếu có
    $(".sub-menu.active").removeClass("active");

    // Toggle class 'active' cho menu mobile
    $(".header__menu--mobile").toggleClass("active");

    // Thêm hoặc xóa class 'overflow' cho body dựa trên trạng thái của menu mobile
    $("body").toggleClass(
      "overflow",
      $(".header__menu--mobile").hasClass("active")
    );
  });
  $(".menu__mobile--inner .menu-item-has-children .ic-next").on(
    "click",
    function () {
      $(this).siblings(".sub-menu").addClass("active");
    }
  );
  $(".ic-back").on("click", function (e) {
    e.stopPropagation();
    $(this).closest(".sub-menu").removeClass("active");
  });
}
function intro() {
  const $intro = $(".intro");
  const tl = gsap.timeline();

  tl.to($intro.find(".intro-inner"), {
    autoAlpha: 0,
    duration: 2.5, // Increased from 1.3s to 2.5s
    ease: "expo.inOut",
  })
    .to(
      $intro,
      {
        duration: 4, // Increased from 1.5s to 3.2s
        // scaleY: 0,
        opacity: 0,
        transformOrigin: "center top",
        ease: "expo.inOut",
      },
      0.8 // Adjusted this delay from 0.4s to 0.8s to make it more balanced
    )
    .to($intro, {
      autoAlpha: 0,
      duration: 0,
    });
}

function bookingForm() {
  var picker = new Lightpick({
    field: document.getElementById("startday"),
    secondField: document.getElementById("endday"),
    singleDate: false,
    minDate: moment().startOf("now"),
    numberOfMonths: 2,
    // startDate: moment().startOf("day").toDate(),
    // endDate: moment().startOf("day").add(1, "days").toDate(),
    onOpen: function () {
      var input = picker._opts.field;
      var rect = input.getBoundingClientRect();
      var calendar = picker.el;
      if (rect.top >= window.innerHeight / 2) {
        calendar.style.top =
          rect.top + window.scrollY - calendar.offsetHeight + "px";
        calendar.style.left = rect.left + window.scrollX + "px";
      } else {
        calendar.style.top = rect.bottom + window.scrollY + "px";
        calendar.style.left = rect.left + window.scrollX + "px";
      }
    },
  });
}
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
          end: "+=89",
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
function animateTitleSection() {
  gsap.registerPlugin(ScrollTrigger);

  // Tìm tất cả các phần tử .title-keyframe
  const sections = document.querySelectorAll(".title-key-left");

  // Lặp qua từng phần tử .title-keyframe
  sections.forEach((section) => {
    const h2Element = section.querySelector("h2");
    const svgElement = section.querySelector(".icon-wheel");

    // Kiểm tra sự tồn tại của các phần tử cần thiết
    if (h2Element && svgElement) {
      const textSplit = new SplitType(h2Element, { types: "chars" });
      const h2Width = h2Element.offsetWidth;
      const svgWidth = svgElement.offsetWidth;

      // Đặt vị trí ban đầu và ẩn SVG
      const startPointSVG = window.innerWidth < 768 ? svgWidth : svgWidth + 50;
      gsap.set(svgElement, {
        x: -startPointSVG,
        visibility: "hidden",
      });
      gsap.set(section.querySelectorAll(".char"), { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, // Đặt trigger cho từng phần tử section riêng lẻ
          start: "top 65%",
          end: "bottom 65%",
          // markers: true,
          onEnter: function () {
            gsap.set(svgElement, { visibility: "visible" });
          },
        },
        onUpdate: function () {
          const progress = gsap.getProperty(svgElement, "x");
          section.querySelectorAll("h2 .char").forEach((char) => {
            if (progress >= char.offsetLeft) {
              gsap.to(char, { opacity: 1, duration: 0.1 });
            }
          });
        },
      });
      const endPointSVG =
        window.innerWidth < 768 ? h2Width + 32 : h2Width + 113;
      tl.to(svgElement, {
        x: endPointSVG, // Sử dụng endPointSVG
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
  });
}
function animateTitleSectionRightLeft(endPointSVG = 113) {
  gsap.registerPlugin(ScrollTrigger);

  // Find all elements with .title-reverse
  const sections = document.querySelectorAll(".title-key-right");

  sections.forEach((section) => {
    const h2Element = section.querySelector("h2");
    const svgElement = section.querySelector(".icon-wheel");

    // Check if the necessary elements exist
    if (h2Element && svgElement) {
      const textSplit = new SplitType(h2Element, { types: "chars" });
      const h2Width = h2Element.offsetWidth;
      const svgWidth = svgElement.offsetWidth;

      // Set initial position and hide the SVG
      const startPointSVG = window.innerWidth < 768 ? h2Width : h2Width + 113;
      gsap.set(svgElement, {
        x: startPointSVG,
        visibility: "hidden",
      });
      gsap.set(section.querySelectorAll(".char"), { opacity: 0 });

      // Create a timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 64%",
          end: "bottom 64%",
          onEnter: () => gsap.set(svgElement, { visibility: "visible" }),
        },
        onUpdate: () => {
          const progress = gsap.getProperty(svgElement, "x");
          section.querySelectorAll(".char").forEach((char) => {
            console.log(char.offsetLeft + char.offsetWidth);
            // Check if the SVG has moved past the character’s starting position
            if (progress <= char.offsetLeft) {
              gsap.to(char, { opacity: 1, duration: 0.1, overwrite: "auto" });
            }
          });
        },
      });

      // Define the SVG animation
      const endPointSVG = window.innerWidth < 768 ? svgWidth : svgWidth + 50;
      tl.to(svgElement, {
        x: -endPointSVG,
        rotation: -360,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(svgElement, {
            opacity: 0,
            scale: 0.5,
            ease: "power1.inOut",
            onComplete: () => gsap.set(svgElement, { visibility: "hidden" }),
          });
        },
      });
    }
  });
}

function animationLineVertical() {
  gsap.registerPlugin(ScrollTrigger);

  // Select all elements that match the sectionClass
  const sections = gsap.utils.toArray(".line-cap-hotel");

  sections.forEach((section) => {
    // Find the trigger element inside the section or use the section itself
    const triggerElement = section.querySelector(".line-cap-hotel");

    gsap.fromTo(
      section,
      { height: "0%" },
      {
        height: "100%",
        duration: 0.1,
        scrollTrigger: {
          trigger: ".line-cap-hotel", // Fallback to section if triggerClass is not found
          start: "top 60% ",
          end: "+=50",
          scrub: 0.5,
        },
      }
    );
  });
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
      $(".swiper-tab-detail").each(function (index, element) {
        const swiper = new Swiper(element, {
          // Optional parameters
          direction: "horizontal",
          grabCursor: true,
          slidesPerView: 1.2,
          slidesPerGroup: 1,
          centeredSlides: false,
          loop: true,
          spaceBetween: 24,
          mousewheel: {
            forceToAxis: true,
          },
          pagination: {
            el: $(element).closest(".tab-pane").find(".swiper-pagination")[0],
            type: "progressbar",
          },
          navigation: {
            nextEl: $(element)
              .closest(".hotels__slider")
              .find(".swiper-button-next")[0],
            prevEl: $(element)
              .closest(".hotels__slider")
              .find(".swiper-button-prev")[0],
          },
          speed: 700,
          slideActiveClass: "is-active",
          slideDuplicateActiveClass: "is-active",
          breakpoints: {
            768: {
              direction: "horizontal",
              grabCursor: true,
              slidesPerView: 2,
              slidesPerGroup: 1,
              centeredSlides: false,
              loop: true,
              spaceBetween: 40,
            },
          },
        });
      });

      function updateSlideCount() {
        $(".tab-pane.show .swiper-tab-detail").each(function () {
          const activeSlideCount = $(this).find(".swiper-slide").length;
          $(this)
            .closest(".hotels-sec")
            .find(".swiper-arrows")
            .toggleClass("d-none", activeSlideCount <= 2);
        });
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
      pagination: {
        el: ".restaurant__content .swiper-pagination",
        type: "progressbar",
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
      pagination: {
        el: ".act-text .swiper-pagination",
        type: "progressbar",
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
      navigation: {
        nextEl: ".offer-detail__image .swiper-button-next",
        prevEl: ".offer-detail__image .swiper-button-prev",
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
      slidesPerView: 1.5,
      spaceBetween: 24,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: ".offer-sec .swiper-pagination",
        type: "progressbar",
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
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
        start: "top 70%",
        end: "bottom 70%",
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
        start: "top 75%",
        end: "bottom 75%",
        onEnter: () => el.classList.add("active"), // Add class when entering the viewport
        onLeaveBack: () => el.classList.remove("active"), // Remove class when scrolling back up
      });
    });
  }
  ScrollTrigger.refresh();
}
