function showBlockPage(blockedUrl, threatType) {
  document.body.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      z-index: 99999;
      padding: 20px;
      text-align: center;
      font-family: Arial, sans-serif;
    ">
      <img src="${chrome.runtime.getURL('assets/warning-icon.png')}" width="64" style="margin-top: 50px">
      <h1 style="color: #d32f2f;">⚠️ Ramiof заблокировал этот сайт</h1>
      <p><strong>${blockedUrl}</strong> содержит ${threatType}.</p>
      <div style="margin: 30px;">
        <button onclick="window.history.back()" style="
          padding: 10px 20px;
          background: #d32f2f;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">Вернуться назад</button>
      </div>
      <p style="font-size: 12px; color: #777;">
        Вы можете <a href="#" id="report-link">сообщить об ошибке</a>, если это безопасный сайт.
      </p>
    </div>
  `;

  document.getElementById('report-link').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage({ action: "reportError", url: blockedUrl });
  });
}


chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "siteBlocked") {
    showBlockPage(request.url, request.threatType || "фишинг или вредоносное ПО");
  }
});

function showBlockPage(blockedUrl, threatType) {
  document.body.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;
      z-index: 99999;
      padding: 20px;
      text-align: center;
      font-family: Arial, sans-serif;
    ">
      <img src="${chrome.runtime.getURL('assets/warning-icon.png')}" width="64" style="margin-top: 50px">
      <h1 style="color: #d32f2f;">⚠️ Ramiof заблокировал этот сайт</h1>
      <p><strong>${blockedUrl}</strong> содержит ${threatType}.</p>
      <div style="margin: 30px;">
        <button onclick="window.history.back()" style="
          padding: 10px 20px;
          background: #d32f2f;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">Вернуться назад</button>
      </div>
      <p style="font-size: 12px; color: #777;">
        Вы можете <a href="#" id="report-link">сообщить об ошибке</a>, если это безопасный сайт.
      </p>
    </div>
  `;

  document.getElementById('report-link').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage({ action: "reportError", url: blockedUrl });
  });
}


chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "siteBlocked") {
    showBlockPage(request.url, request.threatType || "фишинг или вредоносное ПО");
  }
});