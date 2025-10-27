import * as Model from "./model.js";
import { renderAllMessages } from "./view.js";
import { getBotResponse } from "./eliza.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("Controller loaded ");

  const form = document.getElementById("chatForm");
  const input = document.getElementById("messageBox");
  const chatWindow = document.getElementById("chatWindow");
  const exportBtn = document.getElementById("exportBtn");
  const importFile = document.getElementById("importFile");
  const clearBtn = document.getElementById("clearBtn");

  renderAllMessages(Model.getMessages());
  document.addEventListener("messagesUpdated", (e) =>
    renderAllMessages(e.detail.messages)
  );

   // Handle send message
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    Model.addMessage(text, "user");
    Model.addMessage(getBotResponse(text), "bot");
    input.value = "";
  });

   // Handle Edit/Delete actions
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

  // Handle Export/Import/Clear
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
