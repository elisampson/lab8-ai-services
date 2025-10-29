document.getElementById("sendBtn").addEventListener("click", async () => {
  const key = prompt("Enter your Gemini API key (from makersuite.google.com):");
  const input = document.getElementById("prompt").value;

  try {
    const resp = await fetch(
  `https://generativelanguage.googleapis.com/v1beta1/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        }),
      }
    );

    const data = await resp.json();

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      JSON.stringify(data, null, 2);

    document.getElementById("output").textContent = output;
  } catch (err) {
    document.getElementById("output").textContent = "Error: " + err.message;
  }
});
