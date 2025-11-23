let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slide");

  // Clamp index instead of looping
  if (n > slides.length) slideIndex = slides.length;
  if (n < 1) slideIndex = 1;

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
  }

  // Show the selected slide with a fade
  slides[slideIndex - 1].classList.add("active");

  // --- Hide/show arrows ---
  document.getElementById("leftbutton").style.display =
      slideIndex === 1 ? "none" : "block";

  document.getElementById("rightbutton").style.display =
      slideIndex === slides.length ? "none" : "block";
} 