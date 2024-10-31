<script>
    import { addExpense } from '../lib/api.js';
    let item_name = '';
    let category = '';
    let amount = '';
    let date = '';

    async function handleSubmit() {
        await addExpense({ item_name, category, amount, date });
        item_name = '';
        category = '';
        amount = '';
        date = '';
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Item Name" bind:value={item_name} required />
    <input type="text" placeholder="Category" bind:value={category} required />
    <input type="number" placeholder="Amount" bind:value={amount} required />
    <input type="date" bind:value={date} required />
    <button type="submit">Add Expense</button>
</form>
