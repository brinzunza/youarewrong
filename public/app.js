document.getElementById('argumentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const argument = document.getElementById('argumentInput').value;
    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('/api/argument', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ argument }),
        });

        const data = await response.json();
        responseDiv.textContent = data.response;
    } catch (error) {
        responseDiv.textContent = 'An error occurred. Please try again.';
    }
}); 