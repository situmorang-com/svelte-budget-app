<script>
  import { onMount } from 'svelte';
  // import groceriesData from '../api/groceries.json'; // Import groceries data from external JSON file

  let groceries = [];
  let filteredItems = [];
  let selectedItem = "";
  let selectedCategory = "";
  let selectedPrice = "";
  let showDropdown = false;
  let purchasedItems = [];
  let purchaseDate = new Date().toISOString().split('T')[0];
  let showNotification = false;

  // Load groceries from JSON file
  async function loadGroceries() {
    try {
      const response = await fetch('http://localhost:8000/api/serve_groceries.php?t=' + new Date().getTime(), {
        cache: 'no-cache' // Prevent caching
      });
      groceries = (await response.json()).groceries;
      filteredItems = groceries;
    } catch (error) {
      console.error('Failed to load groceries data:', error);
    }
  }

  onMount(() => {
    loadGroceries();
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
    updateSelection(itemName);
  }

  // Update category and price when a matching item is selected
  function updateSelection(itemName) {
    const item = groceries.find((grocery) => grocery.name.toLowerCase() === itemName.toLowerCase());
    if (item) {
      selectedCategory = item.category;
      selectedPrice = item.price;
    } else {
      selectedCategory = "";
      selectedPrice = "";
    }
    // Clear the filteredItems to close the dropdown
    filteredItems = [];
  }

  // Add selected item to purchased items list
  async function addToPurchasedList() {
    if (selectedItem && selectedCategory && selectedPrice && purchaseDate) {
      // Check if item exists in groceries list
      const itemExists = groceries.some(grocery => grocery.name.toLowerCase() === selectedItem.toLowerCase());

      // Add new item to groceries.json if it doesn't exist
      if (!itemExists) {
        const newItem = {
          name: selectedItem,
          category: selectedCategory,
          price: parseFloat(selectedPrice.replace(',', ''))
        };

        try {
          const response = await fetch('http://localhost:8000/api/update_groceries.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
          });

          const result = await response.json();
          if (result.status === 'success') {
            await loadGroceries(); // Reload groceries data
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error('Error adding item to groceries:', error);
        }
      }

      // Add item to purchased list
      purchasedItems = [
        ...purchasedItems,
        {
          name: selectedItem,
          category: selectedCategory,
          price: parseFloat(selectedPrice.replace(',', '')),
          date: purchaseDate
        }
      ];
      // Reset selected item, category, and price
      selectedItem = "";
      selectedCategory = "";
      selectedPrice = "";
      purchaseDate = new Date().toISOString().split('T')[0];

      // Show notification for item added
      showNotification = true;
      setTimeout(() => {
        showNotification = false;
      }, 3000); // Hide notification after 3 seconds
    } else {
      alert("Please fill in all fields, including date.");
    }
  }

  // Calculate total amount of purchases for a given date
  function calculateTotalAmount(date) {
    return purchasedItems
      .filter(item => item.date === date)
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2)
      // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
</script>

<main>
  <h1>Grocery Selection</h1>

  <!-- Notification Section -->
  {#if showNotification}
    <div class="notification">Item added to purchased list!</div>
  {/if}

  <!-- Input for search and dropdown -->
  <div class="item-name">
    <input
      type="text"
      bind:value={selectedItem}
      on:input={filterItems}
      on:focus={() => (showDropdown = true)}
      placeholder="Type to search or add item"
      autocomplete="off"
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

    <label for="date">Purchase Date:</label>
    <input type="date" id="date" bind:value={purchaseDate} />
  </div>

  <!-- Button to add to purchased list -->
  <button on:click={addToPurchasedList}>Add to Purchased List</button>

  <!-- Button to refresh groceries data manually -->
  <!-- <button on:click={loadGroceries}>Refresh Groceries</button> -->

  <!-- Grouped List of Purchased Items -->
  <h2>Purchased Items</h2>
  {#each Array.from(new Set(purchasedItems.map(item => item.date))) as date}
    <div class="purchase-group">
      <div class="purchase-header">
        <strong>
          {date === new Date().toISOString().split('T')[0] ? 'Today' : date}
        </strong>
        <span class="total-amount">
          Total: Rp {parseFloat(calculateTotalAmount(date)).toLocaleString()}
        </span>
      </div>
      <ul class="purchased-items-list">
        {#each purchasedItems.filter(item => item.date === date) as item, index}
          <li class="purchased-item">
            <span class="item-number">{index + 1}.</span>
            <span class="item-details">{item.name} - {item.category}</span>
            <span class="item-price">Rp {item.price.toLocaleString()}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  label,
  h2 {
    display: block;
    margin-top: 10px;
  }

  .item-name {
    position: relative;
    width: 100%;
  }

  input,
  button {
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
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
    /* border-radius: 4px; */
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

  .notification {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    margin-bottom: 15px;
    text-align: center;
    border-radius: 4px;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  ul {
    padding: 0;
  }

  li {
    cursor: pointer;
    margin: 2px 0;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }

  .purchase-group {
    margin-top: 20px;
  }

  .purchase-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f0f0f0;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #555;
  }

  .total-amount {
    font-weight: bold;
  }

  .purchased-items-list {
    list-style-type: none;
    padding-left: 0;
  }

  .purchased-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }

  .item-number {
    margin-right: 10px;
  }

  .item-details {
    flex-grow: 1;
    text-align: left;
  }

  .item-price {
    text-align: right;
    width: 100px;
  }
</style>
