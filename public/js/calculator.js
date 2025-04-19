// FUCTION TO CHANGE THE RATE TO ANY CURRENCY WITHOUT STORING IT IN THE LOCAL STORAGE 
  const currencySelect = document.getElementById('currency-sidebar');

  async function updateRates() {
    const selectedCurrency = currencySelect.value;

    // Show spinner while loading
    document.querySelectorAll('.balance').forEach(el => {
      el.innerHTML = `<span class="spinner"></span> converting...`;
    });

    try {
      const response = await fetch('https://v6.exchangerate-api.com/v6/43d7d7fb9abf1529254bd3cf/latest/USD');
      const data = await response.json();
      const rate = data.conversion_rates[selectedCurrency];

      // Convert and update balance
      document.querySelectorAll('.balance').forEach(el => {
        const baseUSD = parseFloat(el.dataset.usd);
        const converted = baseUSD * rate;

        const formatted = converted.toLocaleString('en-US', {
          style: 'currency',
          currency: selectedCurrency,
          minimumFractionDigits: 2,
        });

        el.innerText = formatted;
      });

    } catch (err) {
      console.error("Conversion failed:", err);
      document.querySelectorAll('.balance').forEach(el => {
        el.innerText = 'Error';
      });
    }
  }

  // Change listener
  currencySelect.addEventListener('change', updateRates);

  // On page load: force default to USD
  window.addEventListener('DOMContentLoaded', () => {
    currencySelect.value = 'USD'; // Set dropdown to USD
    updateRates(); // Run conversion immediately
  });











// FUNCTION TO CALCULATE CARDS WITH ADMIN'S RATE AND CONVERT USING API
const ratesData = document.getElementById('rates-data').getAttribute('data-rates');
const rates = JSON.parse(ratesData);

let lastUSDValue = 0; // Save the last calculated USD amount
const resultEl = document.getElementById('result');

async function updateResult(targetCurrency, usdAmount) {
  // Show spinner during currency change
  resultEl.innerHTML = `<span class="spinner"></span> Converting...`;

  try {
    const response = await fetch('https://v6.exchangerate-api.com/v6/43d7d7fb9abf1529254bd3cf/latest/USD');
    const data = await response.json();
    const conversionRate = data.conversion_rates[targetCurrency];

    const convertedAmount = usdAmount * conversionRate;

    setTimeout(() => {
      const formatted = convertedAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: targetCurrency,
        minimumFractionDigits: 2
      });
      resultEl.innerText = `Result: ${formatted}`;
    }, 2000);
  } catch (error) {
    resultEl.innerText = "Error fetching conversion rate.";
  }
}

document.getElementById('calculator-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const brand = document.getElementById('brand').value;
  const targetCurrency = document.getElementById('currency').value;

  resultEl.innerHTML = `<span class="spinner"></span> Calculating...`;

  const rate = rates.find(r => r.brand === brand);
  if (rate) {
    lastUSDValue = amount * rate.rateUSD;
    setTimeout(() => {
      updateResult(targetCurrency, lastUSDValue);
    }, 2000);
  } else {
    setTimeout(() => {
      resultEl.innerText = "Rate not available for selected brand";
    }, 3000);
  }
});

// 🔁 Spinner when changing currency
document.getElementById('currency').addEventListener('change', () => {
  if (lastUSDValue > 0) {
    const newCurrency = document.getElementById('currency').value;
    updateResult(newCurrency, lastUSDValue);
  }
});