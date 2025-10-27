const chatWindow = document.getElementById("chatWindow");

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createMessageElement(m) {
  const div = document.createElement("div");
  div.className = `message ${m.sender}`;
  div.dataset.messageId = m.id;

  // message text
  const p = document.createElement("p");
  p.textContent = m.text;

  if (m.edited) {
    const tag = document.createElement("span");
    tag.textContent = " (edited)";
    tag.style.fontSize = "0.8rem";
    tag.style.opacity = 0.7;
    p.appendChild(tag);
  }

  // timestamp
  const time = document.createElement("time");
  time.textContent = formatTime(m.timestamp);

  // append main content
  div.appendChild(p);
  div.appendChild(time);

  // add edit/delete tool
  if (m.sender === "user") {
    const tools = document.createElement("div");
    tools.className = "tools";
    tools.innerHTML = `
      <button data-edit>Edit</button>
      <button data-delete>Delete</button>
    `;
    div.appendChild(tools);
  }

  return div;
}

export function renderAllMessages(msgs) {
  chatWindow.innerHTML = "";
  msgs.forEach((m) => chatWindow.appendChild(createMessageElement(m)));
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
