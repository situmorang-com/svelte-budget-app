export async function getExpenses() {
    const response = await fetch('https://your-domain.com/api/api.php');
    return await response.json();
}

export async function addExpense(expense) {
    const response = await fetch('https://your-domain.com/api/api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    });
    return await response.json();
}
