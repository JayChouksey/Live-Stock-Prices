const apiKey = "aa930134bdmsh8f124625c8bdc58p1d3f76jsnb0b6327337f5";
const apiHost = "apidojo-yahoo-finance-v1.p.rapidapi.com";

document.getElementById('fetch-button').addEventListener('click', async () => {
    const symbol = document.getElementById('stock-symbol').value.trim().toUpperCase();

    if (!symbol) {
        alert("Please enter a stock symbol.");
        return;
    }

    try {
        // Fetch data from Yahoo Finance API
        const response = await fetch(`https://${apiHost}/stock/v2/get-summary?symbol=${symbol}&region=US`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost,
            },
        });

        if (!response.ok) throw new Error("Failed to fetch data. Check the symbol or try again.");

        const stockData = await response.json();

        // Extract necessary fields
        const price = stockData.price.regularMarketPrice.raw;
        const change = stockData.price.regularMarketChangePercent.fmt;
        const exchange = stockData.price.exchangeName || "Unknown";
        const time = new Date(stockData.price.regularMarketTime * 1000).toLocaleString();

        // Populate table
        const stockDataRow = `
            <tr>
                <td>${symbol}</td>
                <td>${exchange}</td>
                <td>₹${price.toFixed(2)}</td>
                <td style="color: ${change.includes('-') ? '#e74c3c' : '#2ecc71'};">${change}</td>
                <td>${time}</td>
            </tr>
        `;

        document.getElementById('stock-data').innerHTML = stockDataRow;

    } catch (error) {
        alert(`Error fetching stock data: ${error.message}`);
        console.error(error);
    }
});
