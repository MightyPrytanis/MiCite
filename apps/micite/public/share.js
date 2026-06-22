const MICITE_SHARE_URL = 'https://micite.online/';

function showShareMessage(message) {
  let notice = document.querySelector('#share-message');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'share-message';
    notice.className = 'share-message';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    document.body.appendChild(notice);
  }

  notice.textContent = message;
  notice.classList.add('visible');
  window.clearTimeout(showShareMessage.timeoutId);
  showShareMessage.timeoutId = window.setTimeout(() => {
    notice.classList.remove('visible');
  }, 4200);
}

async function shareMiCite() {
  const shareData = {
    title: 'MiCite',
    text: 'MiCite helps format legal citations for Michigan legal writing.',
    url: MICITE_SHARE_URL,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareData.url);
      showShareMessage('MiCite link copied.');
      return;
    }

    showShareMessage(`Copy this link to share MiCite: ${shareData.url}`);
  } catch (err) {
    if (err && err.name === 'AbortError') return;
    showShareMessage(`Copy this link to share MiCite: ${shareData.url}`);
  }
}

document.querySelectorAll('[data-share-micite]').forEach((button) => {
  button.addEventListener('click', () => shareMiCite());
});
