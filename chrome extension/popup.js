async function fetchRates() {
    try {
        const appId = '9683fca6655a42159e046b1cb98f2029'; // Replace with your actual app ID
        const [fiatResponse, cryptoResponse] = await Promise.all([
            fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`),
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
        ]);

        const fiatRates = await fiatResponse.json();
        const cryptoRates = await cryptoResponse.json();

        console.log('Fiat Rates:', fiatRates); // Print fiatRates to the console


        const usdToTnd = fiatRates.rates.TND;
        const usdToEur = fiatRates.rates.EUR;
        const eurToUsd = 1 / usdToEur;
        const eurToTnd = usdToTnd / usdToEur;

        document.querySelector('#usd-tnd .rate').textContent = usdToTnd.toFixed(4);
        document.querySelector('#eur-tnd .rate').textContent = eurToTnd.toFixed(4);
        document.querySelector('#eur-usd .rate').textContent = eurToUsd.toFixed(4);
        document.querySelector('#usd-eur .rate').textContent = usdToEur.toFixed(4);
        document.querySelector('#btc-usd .rate').textContent = cryptoRates.bitcoin.usd.toFixed(0);
        document.querySelector('#eth-usd .rate').textContent = cryptoRates.ethereum.usd.toFixed(0);
    } catch (error) {
        console.error('Error fetching conversion rates:', error);
        document.querySelector('#usd-tnd .rate').textContent = 'Error';
        document.querySelector('#eur-tnd .rate').textContent = 'Error';
        document.querySelector('#eur-usd .rate').textContent = 'Error';
        document.querySelector('#usd-eur .rate').textContent = 'Error';
        document.querySelector('#btc-usd .rate').textContent = 'Error';
        document.querySelector('#eth-usd .rate').textContent = 'Error';
    }
}

// Fetch rates when the popup is opened
fetchRates();

// Refresh button event listener
document.getElementById('refresh').addEventListener('click', fetchRates);