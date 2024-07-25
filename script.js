async function checkSpelling() {
    // Placeholder function for spell checking
    // In actual implementation, this function would call a spell check API
    const inputText = document.getElementById('inputText').value;
    try {
        const response = await fetch('https://b354-118-185-182-181.ngrok-free.app/correct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error occurred');
        }

        const data = await response.json();
		document.getElementById('outputText').innerText = data.corrected_text;
    } catch (error) {
        console.error('Error:', error);
        outputText.innerText = 'Error: ' + error.message;
    } finally {
        spinner.style.display = 'none';
        overlay.style.display = 'none';
    }
    // const correctedText = inputText; // Replace this with actual corrected text from API

    // document.getElementById('outputText').innerText = correctedText;
}

function copyToClipboard() {
    const outputText = document.getElementById('outputText').innerText;
    const textarea = document.createElement('textarea');
    textarea.value = outputText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const copyAlert = document.getElementById('copyAlert');
    copyAlert.style.display = 'block';
    setTimeout(() => {
        copyAlert.style.display = 'none';
    }, 2000);
}