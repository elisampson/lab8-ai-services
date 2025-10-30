import * as Model from "./model.js";
import { renderAllMessages } from "./view.js";
import { ElizaService } from "../ai/ElizaService.js";
import GeminiService from "../ai/GeminiService.js";
import { MockService } from "../ai/MockService.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("Controller loaded");

  // --- DOM elements ---
  const form = document.getElementById("chatForm");
  const input = document.getElementById("messageBox");
  const chatWindow = document.getElementById("chatWindow");
  const exportBtn = document.getElementById("exportBtn");
  const importFile = document.getElementById("importFile");
  const clearBtn = document.getElementById("clearBtn");

  // Provider controls
  const providerSelect = document.getElementById("providerSelect");
  const apiKeyInput = document.getElementById("apiKeyInput");
  const saveKeyBtn = document.getElementById("saveKeyBtn");
  const keyStatus = document.getElementById("keyStatus");

  // --- Model + View setup ---
  renderAllMessages(Model.getMessages());
  document.addEventListener("messagesUpdated", (e) =>
    renderAllMessages(e.detail.messages)
  );

  // --- AI provider state ---
  let ai = new ElizaService(); // default

  function setProvider(name) {
    const keyGetter = () => localStorage.getItem("geminiKey");
    switch (name) {
      case "gemini":
        ai = new GeminiService(keyGetter());
        break;
      case "mock":
        ai = new MockService();
        break;
      default:
        ai = new ElizaService();
    }
  }

  providerSelect?.addEventListener("change", (e) => {
    setProvider(e.target.value);
  });

  saveKeyBtn?.addEventListener("click", () => {
    const key = apiKeyInput.value.trim();
    if (key) {
      localStorage.setItem("geminiKey", key);
      keyStatus.textContent = "Key saved locally";
      apiKeyInput.value = "";
    } else {
      keyStatus.textContent = "Enter a key first";
    }
  });

  // --- Handle Send Message ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    Model.addMessage(text, "user");
    input.value = "";

    try {
      // ✅ Fixed: only send text to Gemini (no role/content nesting)
      const history = Model.getMessages().map((m) => ({
        text: m.text
      }));

      const reply = await ai.getResponse(text, history);
      Model.addMessage(reply, "bot");
    } catch (err) {
      console.error(err);
      Model.addMessage("Error: " + err.message, "bot");
    }
  });

  // --- Handle Edit/Delete actions ---
  chatWindow.addEventListener("click", (e) => {
    const msgEl = e.target.closest(".message");
    if (!msgEl) return;
    const id = msgEl.dataset.messageId;
    if (e.target.hasAttribute("data-edit")) {
      const newText = prompt("Edit:", msgEl.querySelector("p").textContent);
      if (newText) Model.updateMessage(id, newText);
    }
    if (e.target.hasAttribute("data-delete")) {
      if (confirm("Delete this message?")) Model.deleteMessage(id);
    }
  });

  // --- Export/Import/Clear ---
  exportBtn.addEventListener("click", () => {
    const blob = new Blob([Model.exportMessages()], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chat-history.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  importFile.addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => Model.importMessages(r.result);
    r.readAsText(f);
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("Clear all messages?")) Model.clearMessages();
  });
});
