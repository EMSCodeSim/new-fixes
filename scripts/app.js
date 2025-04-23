document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const endButton = document.getElementById("endButton");
  const sendButton = document.getElementById("sendButton");
  const micButton = document.getElementById("micButton");
  const userInput = document.getElementById("userInput");
  const output = document.getElementById("output");

  let scenarioStarted = false;

  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    output.appendChild(messageElement);
    output.scrollTop = output.scrollHeight;
  }

  async function sendMessage(message) {
    appendMessage("You", message);

    try {
      const response = await fetch("/.netlify/functions/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      appendMessage("AI", data.response);
    } catch (error) {
      console.error("Error sending message:", error);
      appendMessage("System", "There was an error sending your message.");
    }
  }

  startButton.addEventListener("click", () => {
    if (scenarioStarted) return;
    scenarioStarted = true;

    appendMessage("Dispatch", "You are responding to a 55-year-old male with chest pain. Scene is safe.");

    // Example: load scenario data here if needed
    // fetch("data/patients.json").then(res => res.json()).then(data => console.log(data));
  });

  endButton.addEventListener("click", () => {
    if (!scenarioStarted) return;
    scenarioStarted = false;

    appendMessage("System", "Scenario ended. Thank you for participating.");
  });

  sendButton.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message !== "") {
      sendMessage(message);
      userInput.value = "";
    }
  });

  micButton.addEventListener("click", () => {
    appendMessage("System", "Mic input feature coming soon.");
  });
});
