document.addEventListener("DOMContentLoaded", () => {
  const noButton = document.querySelector(".no");
  const yesButton = document.querySelector(".yes");

  function addSpinEffect(element) {
    element.addEventListener("mouseenter", () => {
      element.style.transition = "transform 0.3s ease";
      element.style.transform = "rotate(360deg)";
    });

    element.addEventListener("mouseleave", () => {
      element.style.transition = "transform 0.3s ease";
      element.style.transform = "rotate(0deg)";
    });
  }

  addSpinEffect(noButton);
  addSpinEffect(yesButton);

  noButton.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });

  yesButton.addEventListener("click", () => {
    window.location.href = "./stage1/index.html"; // Change to the actual file name
  });
});
