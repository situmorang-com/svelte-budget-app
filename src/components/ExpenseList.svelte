<script>
    import { onMount } from 'svelte';
    import { getExpenses } from '../lib/api.js';
    let expenses = [];

    onMount(async () => {
        expenses = await getExpenses();
    });
</script>

<ul>
    {#each expenses as expense}
        <li>{expense.item_name} - {expense.category} - ${expense.amount} on {expense.date}</li>
    {/each}
</ul>
