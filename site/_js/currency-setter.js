const CURRENCY_SYMBOLS = {
  USD: '$',
  GBP: '£',
  EUR: '€'
};

document.addEventListener('DOMContentLoaded', function() {
  function getUserCurrency() {
    const locale = navigator.language;
    if (locale.includes('GB')) return 'GBP';
    if (locale.includes('US')) return 'USD';

    return 'EUR';
  }

  function setCurrencies() {
    const currency = getUserCurrency();

    document.querySelectorAll('.currency').forEach(element => {
      element.textContent = CURRENCY_SYMBOLS[currency];
    });
  }

  setCurrencies();
});
