const STORAGE_KEY = "chat-history";
let messages = [];

function loadMessages() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    messages = stored ? JSON.parse(stored) : [];
  } catch {
    messages = [];
  }
}

function saveMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

// Notify other files

function emitUpdate() {
  document.dispatchEvent(
    new CustomEvent("messagesUpdated", { detail: { messages: [...messages] } })
  );
}

export function addMessage(text, sender) {
  const msg = {
    id: Date.now().toString(),
    text,
    sender,
    timestamp: new Date().toISOString(),
    edited: false,
  };
  messages.push(msg);
  saveMessages();
  emitUpdate();
}

export function getMessages() {
  return [...messages];
}

export function updateMessage(id, newText) {
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.text = newText;
    msg.edited = true;
    saveMessages();
    emitUpdate();
  }
}

export function deleteMessage(id) {
  messages = messages.filter((m) => m.id !== id);
  saveMessages();
  emitUpdate();
}

export function clearMessages() {
  messages = [];
  saveMessages();
  emitUpdate();
}

export function exportMessages() {
  return JSON.stringify(messages, null, 2);
}

export function importMessages(json) {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      messages = parsed;
      saveMessages();
      emitUpdate();
    }
  } catch {
    alert("Import failed");
  }
}

loadMessages();
emitUpdate();
