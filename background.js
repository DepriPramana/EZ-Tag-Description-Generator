// This script is intentionally simple.
// Its main purpose is to handle runtime events if needed.
// For now, it ensures the extension structure is complete.

// Example: Listen for installation event to open options page
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});
