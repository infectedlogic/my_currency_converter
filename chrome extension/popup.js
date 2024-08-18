async function fetchRates() {
    try {
        const [fiatResponse, cryptoResponse] = await Promise.all([
            fetch('https://v6.exchangerate-api.com/v6/4f0a0c19c4c935549d36efd7/latest/USD'),
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
        ]);

        const fiatRates = await fiatResponse.json();
        const cryptoRates = await cryptoResponse.json();

        const usdToTnd = fiatRates.conversion_rates.TND;
        const usdToEur = fiatRates.conversion_rates.EUR;
        const eurToTnd = usdToTnd / usdToEur;

        document.querySelector('#usd-tnd .rate').textContent = usdToTnd.toFixed(2);
        document.querySelector('#eur-tnd .rate').textContent = eurToTnd.toFixed(2);
        document.querySelector('#btc-usd .rate').textContent = cryptoRates.bitcoin.usd.toFixed(2);
        document.querySelector('#eth-usd .rate').textContent = cryptoRates.ethereum.usd.toFixed(2);
    } catch (error) {
        console.error('Error fetching conversion rates:', error);
        document.querySelector('#usd-tnd .rate').textContent = 'Error';
        document.querySelector('#eur-tnd .rate').textContent = 'Error';
        document.querySelector('#btc-usd .rate').textContent = 'Error';
        document.querySelector('#eth-usd .rate').textContent = 'Error';
    }
}

// Fetch rates when the popup is opened
fetchRates();

// Refresh button event listener
document.getElementById('refresh').addEventListener('click', fetchRates);
