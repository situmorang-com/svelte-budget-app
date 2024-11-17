<script>
    export let onSubmit;
  
    let item_name = '';
    let category = '';
    let amount = '';
    let date = '';
  
    function handleSubmit() {
      onSubmit({ item_name, category, amount, date });
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
  
  <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    button {
      align-self: flex-start;
    }
  </style>
  