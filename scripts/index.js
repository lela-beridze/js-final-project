const apiUrl = `https://api.coindesk.com/v1/bpi/currentprice/BTC.json`;

async function fetchBitcoinRate() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('data:', data);
        const rate = data.bpi.USD.rate_float;
        document.getElementById('rate').textContent = `1 BTC = ${rate.toFixed(2)} USD`;
        console.log(rate);
        return rate;
    } catch (error) {
        console.error('Error fetching Bitcoin rate:', error);
        document.getElementById('rate').textContent = 'Failed to load rate';
        return null;
    }
}

async function convertToBitcoin() {
    const usdAmount = parseFloat(document.getElementById('usd-amount').value);
    if (isNaN(usdAmount) || usdAmount <= 0) {
        document.getElementById('btc-amount').textContent = 'Please enter a valid amount in USD';
        return;
    }

    const rate = await fetchBitcoinRate();
    if (rate) {
        const btcAmount = usdAmount / rate;
        document.getElementById('btc-amount').textContent = `${usdAmount} USD = ${btcAmount.toFixed(6)} BTC`;
    } else {
        document.getElementById('btc-amount').textContent = 'Failed to convert USD to BTC';
    }
}


fetchBitcoinRate();


setInterval(fetchBitcoinRate, 60000);