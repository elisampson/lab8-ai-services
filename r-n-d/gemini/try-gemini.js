import GeminiService from "../../ai/GeminiService.js";


window.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const promptInput = document.getElementById("prompt");
  const outputEl = document.getElementById("output");

  sendBtn.addEventListener("click", async () => {
    try {
      const key = prompt("Enter your Gemini API key (from makersuite.google.com):");
      const userInput = promptInput.value.trim();

      if (!key || !userInput) {
        alert("Please enter both your API key and a prompt!");
        return;
      }

      outputEl.textContent = "Thinking...";

      //  Create service instance
      const gemini = new GeminiService(key);

      // Request response
      const reply = await gemini.getResponse(userInput);

      outputEl.textContent = reply;
    } catch (err) {
      console.error(" Error:", err);
      outputEl.textContent = " X " + err.message;
    }
  });
});
