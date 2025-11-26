function openNav() {
  document.getElementById("nav-sidebar").classList.add("open");
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("nav-sidebar").classList.remove("open");
} 

try {
  document.getElementById("submitButton").onclick = function (e) {
    e.preventDefault();
    document.getElementById("contactForm").submit();
    setTimeout(() => {
      window.location.href = "thank-you/thankyou.html";
    }, 300); // delay optional
  };
} catch (error) {
  console.error("Caught an error:", error.message); // Output: Caught an error: Cannot divide by zero!
} finally {
  console.log("Finally block executed."); // Output: Finally block executed.
}

let slideIndex = 1;

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
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
