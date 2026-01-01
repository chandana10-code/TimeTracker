console.log("🚀 Background script running");

let lastUrl = null;
let startTime = Date.now();

// Keep worker alive
chrome.alarms.create("tracker", { periodInMinutes: 0.1 });

chrome.alarms.onAlarm.addListener(async () => {
  console.log("⏰ Alarm tick");

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs[0] || !tabs[0].url || !tabs[0].url.startsWith("http")) return;

  const currentUrl = tabs[0].url;
  const now = Date.now();

  if (lastUrl && currentUrl !== lastUrl) {
    const seconds = Math.floor((now - startTime) / 1000);

    fetch("http://127.0.0.1:5000/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        website: lastUrl,
        timeSpent: seconds,
        category: "Other"
      })
    })
      .then(() => console.log("📤 Sent:", lastUrl, seconds))
      .catch(err => console.error("❌ Fetch error", err));

    startTime = now;
  }

  lastUrl = currentUrl;
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("📦 Extension installed");
});
