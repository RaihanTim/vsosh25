export async function checkUrlSafety(url) {
  const API_KEY = "AIzaSyDIRt8axPOhRiJ";
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
    console.error("Safe Browsing Error:", error);
    return false;
  }
}