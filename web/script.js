async function fetchRates() {
    try {
        // Fetch the fiat currency conversion rates
        const fiatResponse = await fetch('https://v6.exchangerate-api.com/v6/4f0a0c19c4c935549d36efd7/latest/USD');
        const fiatRates = await fiatResponse.json();
        
        // Fetch the cryptocurrency rates
        const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const cryptoRates = await cryptoResponse.json();
        
        // USD to TND rate
        const usdToTnd = fiatRates.conversion_rates.TND;
        // USD to EUR rate
        const usdToEur = fiatRates.conversion_rates.EUR;
        
        // Calculate EUR to TND rate
        const eurToTnd = usdToTnd / usdToEur;
        
        // Update the UI with the fetched and calculated rates
        document.querySelector('#usd-tnd .rate').textContent = usdToTnd.toFixed(2);
        document.querySelector('#eur-tnd .rate').textContent = eurToTnd.toFixed(2);
        document.querySelector('#btc-usd .rate').textContent = cryptoRates.bitcoin.usd.toFixed(2);
        document.querySelector('#eth-usd .rate').textContent = cryptoRates.ethereum.usd.toFixed(2);
        
    } catch (error) {
        console.error('Error fetching conversion rates:', error);
    }
}

// Fetch rates on page load
fetchRates();

// Optional: Auto-refresh rates every 10 minutes
setInterval(fetchRates, 10 * 60 * 1000);
