document.addEventListener('DOMContentLoaded', () => {

  let isKeyboardMode = false; // highlight only during keyboard navigation

  // Detect keyboard navigation
  document.addEventListener('keydown', (e) => {
    const keys = ['Tab', 'ArrowLeft', 'ArrowRight'];
    if (keys.includes(e.key)) {
      isKeyboardMode = true;
    }
  });

  // Detect mouse usage → remove highlight
  document.addEventListener('mousedown', () => {
    isKeyboardMode = false;
  });


  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));

  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let index = 1;

  // Clone edges
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  const allSlides = document.querySelectorAll('.carousel-slide');
  const getSlideWidth = () => allSlides[index].getBoundingClientRect().width;


  function setPosition() {
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
  }

  setPosition();


  function moveToIndex() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
    updateActiveSlide();
  }


  nextBtn.addEventListener('click', () => {
    isKeyboardMode = false; // clicking shouldn't highlight
    index++;
    moveToIndex();
  });

  prevBtn.addEventListener('click', () => {
    isKeyboardMode = false;
    index--;
    moveToIndex();
  });


  track.addEventListener('transitionend', () => {
    if (allSlides[index].classList.contains('clone')) {
      track.style.transition = 'none';

      if (index === allSlides.length - 1) {
        index = 1;
      } else if (index === 0) {
        index = allSlides.length - 2;
      }

      setPosition();
    }
  });


  function updateActiveSlide() {
    allSlides.forEach(slide => slide.classList.remove('active'));

    // Only highlight if using keyboard & slide is real
    if (isKeyboardMode && !allSlides[index].classList.contains('clone')) {
      allSlides[index].classList.add('active');
    }
  }


  // Focus + keydown behaviour
  allSlides.forEach((slide, slideIndex) => {

    const link = slide.querySelector('a');
    if (!link) return;

    link.addEventListener('focus', () => {
      if (isKeyboardMode && !slide.classList.contains('clone')) {
        index = slideIndex;
        updateActiveSlide();
      }
    });


    link.addEventListener('keydown', (e) => {

      // Keyboard navigation mode ON
      isKeyboardMode = true;

      const lastReal = allSlides.length - 2;
      const firstReal = 1;

      // TAB forward from last → move focus to next arrow button
      if (e.key === 'Tab' && !e.shiftKey && slideIndex === lastReal) {
        e.preventDefault();
        index = lastReal;
        updateActiveSlide();
        setPosition();
        nextBtn.focus();
      }

      // TAB backward from first → move focus to prev arrow button
      if (e.key === 'Tab' && e.shiftKey && slideIndex === firstReal) {
        e.preventDefault();
        index = firstReal;
        updateActiveSlide();
        setPosition();
        prevBtn.focus();
      }
    });
  });


  window.addEventListener('resize', setPosition);
});
