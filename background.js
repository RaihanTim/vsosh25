
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isMalicious = await checkUrlWithGoogleSafeBrowsing(tab.url);
    if (isMalicious) {
      chrome.tabs.sendMessage(tabId, {
        action: "showWarning",
        message: "Внимание! Этот сайт может быть фишинговым."
      });
    }
  }
});
async function checkUrlWithGoogleSafeBrowsing(url) {
  const API_KEY = "AIzaSyDIRt8axPOhRiJ-Ci8fhKK0WIkz3leMf68"; 
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

  const requestData = {
    client: { clientId: "Ramiof", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
    return data.matches && data.matches.length > 0;
  } catch (error) {
    console.error("Ошибка Safe Browsing API:", error);
    return false;
  }
  
};

function updateExtensionBadge() {
  chrome.action.setBadgeText({ text: "!" });
  chrome.action.setBadgeBackgroundColor({ color: "#d32f2f" });
  chrome.action.setTitle({ title: "Ramiof: заблокирована угроза!" });
}


chrome.action.onClicked.addListener(() => {
  chrome.action.setBadgeText({ text: "" });
});