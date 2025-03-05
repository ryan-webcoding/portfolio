// Import Planck.js
const pl = planck;

// Create world with gravity
const world = new pl.World(pl.Vec2(0, 10));

const pixelsToMeters = 30;
let balls = []; // Store all ball instances
let clickCount = 0;
let reachedMaxCount = false;

// Static wall (matching CSS wall position and size)
const wallBody = world.createBody({
  type: "static",
  position: pl.Vec2(1015 / pixelsToMeters + 15, 615 / (2 * pixelsToMeters)),
});
wallBody.createFixture(
  pl.Box(10 / (2 * pixelsToMeters), 615 / (2 * pixelsToMeters) + 2)
);

// Static floor (matching CSS floor position and size)
const floorBody = world.createBody({
  type: "static",
  position: pl.Vec2(1485 / (2 * pixelsToMeters), 615 / pixelsToMeters + 3.2),
});
floorBody.createFixture(
  pl.Box(1485 / (2 * pixelsToMeters), 10 / (2 * pixelsToMeters))
);

function spawnBall() {
  if (reachedMaxCount) return; // Prevent ball generation after max count

  const ballBody = world.createBody({
    type: "dynamic",
    position: pl.Vec2(15, 15),
    linearVelocity: { x: 10, y: -10 },
    angularVelocity: -10,
  });
  ballBody.createFixture(pl.Circle(40 / 30 - 0.65), {
    density: 1.0,
    friction: 0.3,
    restitution: 0.8,
  });
  balls.push(ballBody);

  // Create a new ball image
  const ballImage = document.createElement("img");
  ballImage.className = "paper-ball";
  ballImage.src = "./img/paperBall.png"; // Set your PNG file path here
  ballImage.style.position = "absolute";
  ballImage.style.width = "40px";
  ballImage.style.height = "40px";
  document.body.appendChild(ballImage);

  ballBody.imageElement = ballImage;
}

function updateBallPositions() {
  balls.forEach((ballBody) => {
    const position = ballBody.getPosition();
    const angle = ballBody.getAngle(); // Get the body's rotation

    if (ballBody.imageElement) {
      ballBody.imageElement.style.left = position.x * pixelsToMeters + "px";
      ballBody.imageElement.style.top = position.y * pixelsToMeters + "px";
      ballBody.imageElement.style.transform = `rotate(${
        angle * (180 / Math.PI)
      }deg)`;
    }
  });
}

function playAnimation() {
  if (reachedMaxCount) return; // Prevent animation after max count

  const animationFrames = [
    "./frames/2.png",
    "./frames/3.png",
    "./frames/4.png",
    "./frames/1.png",
  ];
  let frameIndex = 0;
  const animationElement = document.getElementById("animation");

  function nextFrame() {
    if (frameIndex < animationFrames.length) {
      animationElement.src = animationFrames[frameIndex];
      frameIndex++;
      setTimeout(nextFrame, 1000 / 60); // 60 FPS
    }
  }
  nextFrame();
}

const counterElement = document.querySelector(".counter");

function updateCounter() {
  if (reachedMaxCount) {
    window.location.href = "../stage3/index.html"; // Redirect to another page
    return;
  }

  clickCount++;

  let progress = clickCount / 100; // Progress from 0 to 1
  let redValue = Math.floor(progress * 255); // Transition from black to red
  let fontSize = 16 + progress * 14; // Start from 16px and grow to 30px

  counterElement.style.color = `rgb(${redValue}, 0, 0)`;
  counterElement.style.fontSize = `${fontSize}px`;

  if (clickCount === 50) {
    counterElement.textContent = `you've launched half-finished project 50 times, half way through!!`;
  } else if (clickCount === 80) {
    counterElement.textContent = `you've launched half-finished project 80 times, almost there!!!`;
  } else if (clickCount === 100) {
    counterElement.textContent = `congrats! you unlocked the ultimate secret!`;
    document.getElementById("laptop").style.display = "block";
    reachedMaxCount = true; // Stop further updates
  } else {
    counterElement.textContent = `you've launched half-finished project ${clickCount} times, keep working`;
  }
}

function update() {
  world.step(1 / 60);
  updateBallPositions();
  requestAnimationFrame(update);
}

document.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    if (reachedMaxCount) {
      window.location.href = "../stage3/index.html"; // Redirect on the next click
      return;
    }
    spawnBall();
    playAnimation();
    updateCounter();
  }
});

update();
