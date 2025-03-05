// Show the firework initially
firework.style.visibility = "visible";

// Hide the firework after 2 seconds
setTimeout(() => {
  firework.style.visibility = "hidden";
}, 1725);

document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("laptop");

  img.addEventListener("mouseenter", () => {
    img.src = "./img/laptop_on.png";
  });

  img.addEventListener("mouseleave", () => {
    img.src = "./img/laptop.png";
  });

  img.addEventListener("click", () => {
    window.location.href = "../stage4/index.html";
  });
});
