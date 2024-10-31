<script>
  import { onMount } from 'svelte';
  import groceriesData from '../api/groceries.json'; // Import groceries data from external JSON file

  let groceries = [];
  let filteredItems = [];
  let selectedItem = "";
  let selectedCategory = "";
  let selectedPrice = "";

  let showDropdown = false;


  let newItem = {
    name: "",
    category: "",
    price: ""
  };

  // Load groceries from JSON
  onMount(() => {
    groceries = groceriesData.groceries;
    filteredItems = groceries;
  });

  // Filter items based on user input
  function filterItems() {
    filteredItems = groceries.filter(item =>
      item.name.toLowerCase().includes(selectedItem.toLowerCase())
    );
    showDropdown = filteredItems.length > 0;
  }
  // Handle selecting an item
  function selectItem(itemName) {
    selectedItem = itemName;
    showDropdown = false;
  }
  
  // Update category and price when a matching item is selected
  function updateSelection(itemName) {
    const item = groceries.find((grocery) => grocery.name.toLowerCase() === itemName.toLowerCase());
    if (item) {
      selectedItem = item.name;
      selectedCategory = item.category;
      selectedPrice = item.price;
    } else {
      selectedCategory = "";
      selectedPrice = "";
    }
    // Clear the filteredItems to close the dropdown
    filteredItems = [];
  }

  // Add a new item if it doesn't exist in the list
  async function addNewItem() {
    if (newItem.name && newItem.category && newItem.price) {
      groceries.push({ ...newItem });
      await saveToBackend(newItem); // Save the new item to the backend (PHP)
      // Reset new item fields
      newItem.name = "";
      newItem.category = "";
      newItem.price = "";
      alert("Item added successfully!");
    } else {
      alert("Please provide all details to add the item.");
    }
  }

  // Save new item to backend
  async function saveToBackend(item) {
    try {
      const response = await fetch('/add-grocery.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  }
</script>

<main>
  <h1>Grocery Selection</h1>

  <!-- Input for search and dropdown -->
  <div class="item-name">
    <input
      type="text"
      bind:value={selectedItem}
      on:input={filterItems}
      on:focus={() => (showDropdown = true)}
      placeholder="Type to search or add item"
    />
    {#if showDropdown && selectedItem !== ""}
      <ul class="dropdown">
        {#each filteredItems as item}
          <li on:click={() => selectItem(item.name)}>{item.name}</li>
        {/each}
      </ul>
    {/if}
  </div>

  <!-- Inputs for Category and Price (User can edit them) -->
  <div>
    <label for="category">Category:</label>
    <input type="text" id="category" bind:value={selectedCategory} />

    <label for="price">Price:</label>
    <input type="text" id="price" bind:value={selectedPrice} />
  </div>

  <!-- Form to add a new item if it doesn't exist -->
  <div>
    <h2>Add New Item</h2>
    <input type="text" placeholder="Item Name" bind:value={newItem.name} />
    <input type="text" placeholder="Category" bind:value={newItem.category} />
    <input type="text" placeholder="Price" bind:value={newItem.price} />
    <button on:click={addNewItem}>Add Item</button>
  </div>
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  label, h2 {
    display: block;
    margin-top: 10px;
  }

  .item-name {
    position: relative;
    width: 100%;
  }

  input, button {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
  }

  .dropdown {
    list-style-type: none;
    padding: 0;
    margin: 5px;
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
    background: #333; /* Update background color to match the theme */
    position: absolute;
    width: 100%; /* Set width to match the input field */
    z-index: 10;
  }

  .dropdown li {
    cursor: pointer;
    padding: 8px;
    background: #444; /* Update list item background color for better contrast */
    color: white; /* Update text color to be visible on darker background */
  }

  .dropdown li:hover {
    background: #555; /* Darker background on hover for better visual feedback */
  }

  ul {
    padding: 0;
  }

  li {
    cursor: pointer;
    margin: 2px 0;
    padding: 5px;
  }
</style>
