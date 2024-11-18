const apiKey = "aa930134bdmsh8f124625c8bdc58p1d3f76jsnb0b6327337f5";
const apiHost = "yahoo-finance15.p.rapidapi.com";

document.getElementById('fetch-button').addEventListener('click', async () => {
    const symbol = document.getElementById('stock-symbol').value.trim().toUpperCase();

    if (!symbol) {
        alert("Please enter a stock symbol.");
        return;
    }

    try {
        // Fetch data from Yahoo Finance API
        const response = await fetch(`https://${apiHost}/api/quotes/${symbol}?region=IN`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost,
            },
        });

        if (!response.ok) throw new Error(`Failed to fetch data. HTTP Status: ${response.status}`);

        const stockData = await response.json();

        // Extract necessary fields
        const quote = stockData.quoteResponse.result[0];
        const price = quote.regularMarketPrice || "N/A";
        const change = quote.regularMarketChangePercent || "N/A";
        const exchange = quote.fullExchangeName || "Unknown";
        const time = new Date(quote.regularMarketTime * 1000).toLocaleString();

        // Populate table
        const stockDataRow = `
            <tr>
                <td>${symbol}</td>
                <td>${exchange}</td>
                <td>₹${price.toFixed(2)}</td>
                <td style="color: ${change < 0 ? '#e74c3c' : '#2ecc71'};">${change.toFixed(2)}%</td>
                <td>${time}</td>
            </tr>
        `;

        document.getElementById('stock-data').innerHTML = stockDataRow;

    } catch (error) {
        alert(`Error fetching stock data: ${error.message}`);
        console.error(error);
    }
});
