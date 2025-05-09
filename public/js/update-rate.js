// FUNCION TO CHANGE CURRENCY GENERALL IN ALL THE WEBSITE 
// FUNCTION TO CHANGE CURRENCY GENERALLY ACROSS THE WEBSITE
document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('currency-popup');
  const overlay = document.getElementById('currency-overlay');
  const options = document.querySelectorAll('.currency-option');

  // Define or get the current logged-in user ID (replace this with dynamic value in real app)
  const currentUser = window.currentUser || 'guest'; // Replace 'guest' with actual user logic
  const storageKey = `selectedCurrency-${currentUser}`;

  // Check if currency is already stored in localStorage for this user
  const selectedCurrency = localStorage.getItem(storageKey);

  // Show popup only if not already selected
  if (selectedCurrency) {
    popup.classList.remove('show');
    overlay.classList.remove('show');
  } else {
    setTimeout(() => {
      popup.classList.add('show');
      overlay.classList.add('show');
    }, 300);
  }

  // Handle currency selection
  options.forEach(option => {
    option.addEventListener('click', () => {
      const currency = option.getAttribute('data-value');
      console.log("Currency selected:", currency);

      // Save selected currency under per-user key
      localStorage.setItem(storageKey, currency);

      // Hide popup and overlay
      popup.classList.remove('show');
      overlay.classList.remove('show');

      // Optional: update the currency display immediately
      if (typeof updateBalanceCurrency === 'function') {
        updateBalanceCurrency(currency);
      }
    });
  });
});





// <!-- FUNCTION TO CHANGE THE RATE OF THE AVAILABLE BALANCE IN ACTIVE -->
const balanceUSD = 0.02; // base balance in USD
  const currencySelectors = document.querySelectorAll('.currency-selector'); // updated class
  const balanceEls = document.querySelectorAll('.balance'); // where the converted balance is shown

  // Build a unique localStorage key for this user
  const storageKey = `selectedCurrency-${currentUser}`;

  async function updateBalanceCurrency(selectedCurrency) {
    // Show loading spinner
    balanceEls.forEach(el => {
      el.innerHTML = `<span class="spinner"></span> converting...`;
    });

    try {
      const response = await fetch('https://v6.exchangerate-api.com/v6/30bc0d29cfe5dd3481b06245/latest/USD');
      const data = await response.json();

      const conversionRate = data.conversion_rates[selectedCurrency];
      const convertedBalance = balanceUSD * conversionRate;

      const formattedBalance = convertedBalance.toLocaleString('en-US', {
        style: 'currency',
        currency: selectedCurrency,
        minimumFractionDigits: 2,
      });

      // Update all balance displays
      balanceEls.forEach(el => {
        el.innerText = formattedBalance;
      });

      // Update all select boxes
      currencySelectors.forEach(select => {
        select.value = selectedCurrency;
      });

      // Store per-user setting
      localStorage.setItem(storageKey, selectedCurrency);

    } catch (error) {
      balanceEls.forEach(el => el.innerText = 'Conversion failed');
      console.error('Currency conversion failed:', error);
    }
  }

  // Listen to all select changes
  currencySelectors.forEach(select => {
    select.addEventListener('change', () => {
      updateBalanceCurrency(select.value);
    });
  });

  // On load: use stored currency or default to USD
  window.addEventListener('DOMContentLoaded', () => {
    const savedCurrency = localStorage.getItem(storageKey) || 'NGN';
    updateBalanceCurrency(savedCurrency);
  });

  // Handle clicks on div-based currency selector
document.querySelectorAll('.currency-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedCurrency = option.getAttribute('data-value');
    updateBalanceCurrency(selectedCurrency);
  });
});

