document.addEventListener("DOMContentLoaded", function () {
  async function displayTextOnClick(
    paragraphID,
    fileAddress,
    dialogueBoxID,
    nextPage
  ) {
    try {
      const response = await fetch(fileAddress);
      if (!response.ok) {
        throw new Error("Failed to load JSON file");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("JSON file must contain an array");
      }

      let index = 0;
      const paragraph = document.getElementById(paragraphID);
      const dialogueBox = document.getElementById(dialogueBoxID);

      if (!paragraph || !dialogueBox) {
        throw new Error("Invalid paragraphID or dialogueBoxID");
      }

      paragraph.innerText = data[index]; // Display the first message

      document.addEventListener("click", function () {
        index++;
        if (index < data.length) {
          paragraph.innerText = data[index];
        } else {
          window.location.replace(nextPage); // Navigate to the next page
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  displayTextOnClick(
    "dialogues",
    "./dialogue.json",
    "dialogue-container",
    "./stage2/index.html"
  );
});
