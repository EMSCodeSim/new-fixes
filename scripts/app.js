document.addEventListener("DOMContentLoaded", () => {
  const chatDisplay = document.getElementById("chatDisplay");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const startButton = document.getElementById("startButton");
  const endButton = document.getElementById("endButton");

  function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatDisplay.appendChild(msg);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }

  startButton.addEventListener("click", () => {
    appendMessage("Dispatch", "You are responding to a 55-year-old male with chest pain. Scene is safe.");
    // Example: fetch("data/patients.json").then(res => res.json()).then(data => console.log(data));
  });

  endButton.addEventListener("click", () => {
    appendMessage("System", "Scenario ended. Preparing report...");
    // Add logic to finalize scenario and show results
  });

  sendButton.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message === "") return;
    appendMessage("You", message);
    userInput.value = "";

    // Send to backend AI (placeholder for fetch call)
    fetch("/.netlify/functions/openai", {
      method: "POST",
      body: JSON.stringify({ message }),
    })
    .then(res => res.json())
    .then(data => {
      appendMessage("AI", data.response || "AI response placeholder");
    })
    .catch(err => {
      appendMessage("System", "Error reaching AI.");
      console.error(err);
    });
  });
});
