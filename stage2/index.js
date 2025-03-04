// Import Planck.js
const pl = planck;

// Create world with gravity
const world = new pl.World(pl.Vec2(0, 10));

const pixelsToMeters = 30;
let balls = []; // Store all ball instances

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
  const ballBody = world.createBody({
    type: "dynamic",
    position: pl.Vec2(15, 15),
    linearVelocity: { x: 10, y: -10 },
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
    if (ballBody.imageElement) {
      ballBody.imageElement.style.left = position.x * pixelsToMeters + "px";
      ballBody.imageElement.style.top = position.y * pixelsToMeters + "px";
    }
  });
}

function update() {
  world.step(1 / 60);
  updateBallPositions();
  requestAnimationFrame(update);
}

document.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    // Left mouse button
    spawnBall();
  }
});

update();
