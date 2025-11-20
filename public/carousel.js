document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));

  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let index = 1; 
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  const allSlides = document.querySelectorAll('.carousel-slide');
  const getSlideWidth = () => allSlides[index].getBoundingClientRect().width;

  function setPosition() {
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
  }

  setPosition();


  function moveToIndex() {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    updateActiveSlide();
  }

  nextBtn.addEventListener("click", () => {
    index++;
    moveToIndex();
  });

  prevBtn.addEventListener("click", () => {
    index--;
    moveToIndex();
  });


  track.addEventListener("transitionend", () => {
    if (allSlides[index].classList.contains("clone")) {
      track.style.transition = "none";

      if (index === allSlides.length - 1) {
        index = 1;  // Jump to real first
      } else if (index === 0) {
        index = allSlides.length - 2; // Jump to real last
      }

      setPosition();
    }
  });


  function updateActiveSlide() {
    allSlides.forEach(slide => slide.classList.remove('active'));

    // Only mark real slides active
    if (!allSlides[index].classList.contains('clone')) {
      allSlides[index].classList.add('active');
    }
  }

  allSlides.forEach((slide, slideIndex) => {
    const link = slide.querySelector('a');
    if (!link) return;

    link.addEventListener('focus', () => {
      // Only set active if real slide
      if (!slide.classList.contains('clone')) {
        index = slideIndex;
        updateActiveSlide();
      }
    });

    link.addEventListener('keydown', (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        const lastRealSlideIndex = allSlides.length - 2;
        if (slideIndex === lastRealSlideIndex) {
          e.preventDefault();
          index = lastRealSlideIndex;
          updateActiveSlide();
          setPosition();
          nextBtn.focus();
        }
      }
    
      if (e.key === "Tab" && e.shiftKey) {
        const firstRealSlideIndex = 1;
        if (slideIndex === firstRealSlideIndex) {
          e.preventDefault();
          index = firstRealSlideIndex;
          updateActiveSlide();
          setPosition();
          prevBtn.focus();
        }
      }
    });
  });

  window.addEventListener('resize', setPosition);
});
