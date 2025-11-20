document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));

  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let index = 1;

  /* -----------------------------
    1. Clone first + last slides
  ------------------------------*/
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  const allSlides = document.querySelectorAll('.carousel-slide');

  /* -----------------------------
    2. Get proper width including gap
  ------------------------------*/
  const getSlideWidth = () => allSlides[index].getBoundingClientRect().width;

  /* -----------------------------
    3. Set initial position
  ------------------------------*/
  function setPosition() {
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
  }

  setPosition();

  /* -----------------------------
    4. Slide movement
  ------------------------------*/
  function moveToIndex() {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * getSlideWidth()}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (index >= allSlides.length - 1) return;
    index++;
    moveToIndex();
  });

  prevBtn.addEventListener("click", () => {
    if (index <= 0) return;
    index--;
    moveToIndex();
  });

  /* ----------------------------------------
    5. Infinite loop transition correction
  -----------------------------------------*/
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

  /* ----------------------------------------
    6. Adjust width on resize
  -----------------------------------------*/
  window.addEventListener('resize', setPosition);
});
