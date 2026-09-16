(function () {
  const CONSENT_KEY = 'cookie_consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  function getSavedConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (error) {
      /* localStorage indisponível (modo privado etc.): o consentimento
         simplesmente será pedido novamente na próxima visita. */
    }
  }

  function updateConsent(granted) {
    gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-banner');
    if (!banner) {
      return;
    }

    const savedConsent = getSavedConsent();
    if (savedConsent === 'granted' || savedConsent === 'denied') {
      banner.remove();
      return;
    }

    requestAnimationFrame(() => {
      banner.classList.add('cookie-banner--visible');
    });

    const acceptButton = document.getElementById('cookie-banner-aceitar');
    const declineButton = document.getElementById('cookie-banner-recusar');

    const respond = (granted) => {
      saveConsent(granted ? 'granted' : 'denied');
      updateConsent(granted);
      banner.classList.remove('cookie-banner--visible');
      window.setTimeout(() => banner.remove(), 300);
    };

    if (acceptButton) {
      acceptButton.addEventListener('click', () => respond(true));
    }

    if (declineButton) {
      declineButton.addEventListener('click', () => respond(false));
    }
  });
})();
