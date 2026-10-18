document.getElementById('back-btn').addEventListener('click', () => {
  window.history.back();
});

const url = new URL(window.location.href).hash.substring(1);
document.getElementById('blocked-url').textContent = decodeURIComponent(url);