document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("laptop");

  img.addEventListener("mouseenter", () => {
    img.src = "./laptop_on.png";
  });

  img.addEventListener("mouseleave", () => {
    img.src = "./laptop.png";
  });

  img.addEventListener("click", () => {
    window.location.href = "../stage4/index.html";
  });
});
