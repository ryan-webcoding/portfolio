document.addEventListener("DOMContentLoaded", () => {
  const noButton = document.querySelector(".no");
  const yesButton = document.querySelector(".yes");
  let noClickCount = 0;

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
    noClickCount++;

    switch (noClickCount) {
      case 1:
        alert("How dare you");
        break;
      case 2:
        alert("I warned you!");
        break;
      case 3:
        alert("Please dont, you'll regret it.");
        break;
      case 4:
        window.location.href = "https://www.google.com";
        break;
      default:
        break;
    }
  });

  yesButton.addEventListener("click", () => {
    window.location.href = "./stage1/index.html"; // Change to the actual file name
  });
});
