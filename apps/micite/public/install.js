let deferredInstallPrompt = null;

const installButton = document.querySelector('#install-pwa');
const installStatus = document.querySelector('#install-status');

function setInstallStatus(message) {
  if (installStatus) installStatus.textContent = message;
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {
      setInstallStatus('Offline install support is unavailable in this browser.');
    });
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installButton) installButton.disabled = false;
  setInstallStatus('Ready to install from this browser.');
});

if (installButton) {
  installButton.disabled = true;
  installButton.addEventListener('click', async () => {
    if (!deferredInstallPrompt) {
      setInstallStatus('Use your browser menu and choose Install App or Add to Dock/Home Screen.');
      return;
    }
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (installButton) installButton.disabled = true;
    setInstallStatus(choice.outcome === 'accepted' ? 'MiCite install started.' : 'Install dismissed.');
  });
}
