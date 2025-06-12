const saveBtn = document.getElementById('save-btn');
const apiKeyInput = document.getElementById('api-key');
const statusDiv = document.getElementById('status');

// Saves options to chrome.storage
function saveOptions() {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    displayStatus('API Key cannot be empty.', 'red');
    return;
  }
  chrome.storage.sync.set(
    { geminiApiKey: apiKey },
    () => {
      displayStatus('API Key saved successfully!', 'green');
    }
  );
}

// Restores input box state using the preferences stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get(['geminiApiKey'], (result) => {
    if (result.geminiApiKey) {
      apiKeyInput.value = result.geminiApiKey;
    }
  });
}

function displayStatus(message, color) {
    statusDiv.textContent = message;
    statusDiv.style.color = color;
    setTimeout(() => {
        statusDiv.textContent = '';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
saveBtn.addEventListener('click', saveOptions);
