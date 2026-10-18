document.getElementById('options-btn').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});


chrome.storage.sync.get(['isActive'], (data) => {
  const status = document.getElementById('status');
  status.textContent = data.isActive ? 'Защита активна ✅' : 'Защита выключена ❌';
});

chrome.storage.local.get(['lastBlocked'], (data) => {
  if (data.lastBlocked) {
    const warningDiv = document.createElement('div');
    warningDiv.innerHTML = `
      <div style="
        background: #ffebee;
        padding: 10px;
        border-radius: 4px;
        margin: 10px 0;
      ">
        <p>Последняя блокировка: <strong>${data.lastBlocked.url}</strong></p>
        <button id="details-btn">Подробности</button>
      </div>
    `;
    document.body.prepend(warningDiv);
    
    document.getElementById('details-btn').addEventListener('click', () => {
      chrome.tabs.create({ url: `block-info.html#${data.lastBlocked.url}` });
    });
  }
});