document.getElementById("analyzeButton").addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;

    if (!inputText) {
        alert("Please enter some text!");
        return;
    }

    // Send the text to the server for analysis
    const response = await fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
    });

    // Get and display the result
    const result = await response.json();
    if (response.ok) {
        document.getElementById("result").innerHTML = `
            <p><strong>Text:</strong> ${result.text}</p>
            <p><strong>Sentiment:</strong> ${result.sentiment}</p>
            <p><strong>Polarity:</strong> ${result.polarity.toFixed(2)}</p>
            <p><strong>Subjectivity:</strong> ${result.subjectivity.toFixed(2)}</p>
        `;
    } else {
        document.getElementById("result").innerHTML = `<p style="color: red;">Error: ${result.error}</p>`;
    }
});
