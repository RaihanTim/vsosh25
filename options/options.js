const checkPasswords = document.getElementById('check-passwords');
const blockPhishing = document.getElementById('block-phishing');
const checkHttps = document.getElementById('check-https');


chrome.storage.sync.get(
  ['checkPasswords', 'blockPhishing', 'checkHttps'],
  (data) => {
    checkPasswords.checked = data.checkPasswords !== false;
    blockPhishing.checked = data.blockPhishing !== false;
    checkHttps.checked = data.checkHttps !== false;
  }
);


[checkPasswords, blockPhishing, checkHttps].forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    chrome.storage.sync.set({
      checkPasswords: checkPasswords.checked,
      blockPhishing: blockPhishing.checked,
      checkHttps: checkHttps.checked,
      isActive: checkPasswords.checked || blockPhishing.checked || checkHttps.checked
    });
  });
});