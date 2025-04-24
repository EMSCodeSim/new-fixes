document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const endBtn = document.getElementById("endBtn");
  const display = document.getElementById("scenarioDisplay");

  startBtn.addEventListener("click", () => {
    display.innerHTML = `
      <strong>Dispatch:</strong> You are responding to a 55-year-old male with chest pain.<br><br>
      <strong>Scene:</strong> You arrive at a quiet residential neighborhood. The patient is sitting on the porch, clutching his chest and appears pale and diaphoretic.<br><br>
      <strong>General Impression:</strong> Patient is alert but in visible discomfort.
    `;
  });

  endBtn.addEventListener("click", () => {
    display.innerHTML = "<p>Scenario ended. Thank you for participating.</p>";
  });
});
