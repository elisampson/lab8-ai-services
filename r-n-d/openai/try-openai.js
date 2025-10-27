document.getElementById("sendBtn").addEventListener("click", async () => {
  const key = prompt("Enter your OpenAI API key:");
  const userInput = document.getElementById("prompt").value;

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userInput }]
    })
  });

  const data = await resp.json();
  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);
});
