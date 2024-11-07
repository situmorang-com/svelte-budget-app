<script>
  import { onMount, onDestroy } from 'svelte';
  import { openDB } from 'idb';
  // import groceriesData from '../api/groceries.json'; // Import groceries data from external JSON file

  let groceries = [];
  let filteredItems = [];
  let selectedItem = "";
  let selectedCategory = "";
  let selectedPrice = "";
  let showDropdown = false;
  let showCategoryDropdown = false;
  let categoryList = [];
  let filteredCategories = [];
  let purchasedItems = [];
  let purchaseDate = new Date().toISOString().split('T')[0];
  let showNotification = false;
  let refreshMessage = ''; // Variable to store refresh message
  let showRefreshMessage = false; // Boolean to control display of message
  let showInputs = false; // Controls visibility of inputs
  let showAddButton = true;  // State to control button visibility
  let showCalculator = false;
  let calculatorPosition = { top: '0px', left: '0px' };
  let highlightedItemId = null; // Track which purchased item is highlighted
  let itemToDelete = null; // Track which item is pending deletion

  // Load groceries from JSON file
  async function loadGroceries() {
    try {
      const response = await fetch('/api/serve_groceries.php?t=' + new Date().getTime(), {
        cache: 'no-cache' // Prevent caching
      });
      groceries = (await response.json()).groceries;

      // Sort groceries alphabetically by name
      groceries = groceries.sort((a, b) => a.name.localeCompare(b.name));

      // Extract unique categories
      categoryList = Array.from(new Set(groceries.map(item => item.category))).sort();

      filteredItems = groceries; // Set the filtered items to the sorted list initially
      filteredCategories = categoryList; // Set filtered categories initially
    } catch (error) {
      console.error('Failed to load groceries data:', error);
    }
  }

  // Open or create an IndexedDB local device storage database
  async function openDatabase() {
    return openDB('budget-management', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('purchases')) {
          db.createObjectStore('purchases', { keyPath: 'id', autoIncrement: true });
        }
              // Create an object store for groceries
        if (!db.objectStoreNames.contains('groceries')) {
          db.createObjectStore('groceries', { keyPath: 'name' }); // Using `name` as the key
        }
      }
    });
  }

  // Fetch purchased items from IndexedDB and sync with server if online SQLite database using PHP endpoint
  async function fetchPurchasedItems() {
    const db = await openDatabase();
    purchasedItems = await db.getAll('purchases');

    if (navigator.onLine) {
      try {
        const response = await fetch('/api/get_purchases.php');
        const result = await response.json();

        if (result.status === 'success') {
          purchasedItems = result.data;

          // Update IndexedDB with server data
          const tx = db.transaction('purchases', 'readwrite');
          await tx.objectStore('purchases').clear();
          for (const item of purchasedItems) {
            await tx.objectStore('purchases').put(item);
          }

          refreshMessage = 'Data has been successfully refreshed from the server.';
          setTimeout(() => {
            refreshMessage = '';
          }, 3000);
        }
      } catch (error) {
        console.error('Error fetching purchased items:', error);
      }
    }
  }

  // Sync groceries from IndexedDB to the server
  async function syncGroceriesWithServer() {
    if (navigator.onLine) {
      const db = await openDatabase();
      const groceries = await db.getAll('groceries');

      for (const grocery of groceries) {
        try {
          const response = await fetch('/api/update_groceries.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(grocery)
          });
          const result = await response.json();

          if (result.status === 'success') {
            console.log(`Grocery item synced successfully: ${grocery.name}`);
            // Optionally remove the synced item from IndexedDB if it is no longer needed
            await db.delete('groceries', grocery.name);
          } else {
            console.error(`Failed to sync item ${grocery.name}:`, result.message);
          }
        } catch (error) {
          console.error('Error syncing grocery item:', error);
        }
      }
    } else {
      console.warn('Device is offline. Unable to sync groceries.');
    }
  }

  // Add event listener for when the device goes online
  window.addEventListener('online', () => {
    console.log('Network status: Online. Syncing groceries...');
    syncGroceriesWithServer();
  });


  onMount(() => {
    loadGroceries();
    fetchPurchasedItems();
    syncGroceriesWithServer();
    // Load purchased items (from IndexedDB or any other storage)
    loadPurchasedItems();
  });

  // Function to load purchased items and sort them by date (latest first)
  function loadPurchasedItems() {
    // Assuming purchasedItems is already populated with your data
    // Sort purchased items by date in descending order (latest date first)
    purchasedItems = purchasedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Show all items when input is focused
  function showAllItemsOnFocus() {
    filteredItems = groceries; // Show all items when focused
    showDropdown = true; // Display dropdown
  }

  // Show all categories when category input is focused
  function showAllCategoriesOnFocus() {
    filteredCategories = categoryList; // Show all categories when focused
    showCategoryDropdown = true; // Display category dropdown
  }

  // Hide dropdown when input loses focus
  function hideDropdown() {
    // Use a slight delay to allow clicks on dropdown items to be registered
    setTimeout(() => {
      showDropdown = false;
    }, 200);
  }

  // Hide category dropdown when input loses focus
  function hideCategoryDropdown() {
    setTimeout(() => {
      showCategoryDropdown = false;
    }, 200);
  }

  // Filter items based on user input
  function filterItems() {
    if (selectedItem.trim() === "") {
      // If input is empty, show all items
      filteredItems = groceries;
    } else {
      // Otherwise, filter items based on input value
      filteredItems = groceries.filter(item =>
        item.name.toLowerCase().includes(selectedItem.toLowerCase())
      );
    }
    showDropdown = filteredItems.length > 0;
  }

  // Filter categories based on user input
  function filterCategories() {
    if (selectedCategory.trim() === "") {
      filteredCategories = categoryList; // If input is empty, show all categories
    } else {
      filteredCategories = categoryList.filter(category =>
        category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    showCategoryDropdown = filteredCategories.length > 0;
  }

  // Handle selecting an item
  function selectItem(itemName) {
    selectedItem = itemName;
    showDropdown = false;
    updateSelection(itemName);
  }

    // Handle selecting a category from dropdown
    function selectCategory(category) {
    selectedCategory = category;
    showCategoryDropdown = false; // Hide category dropdown after selection
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



  // Add selected item to purchased items list
  async function addToPurchasedList() {
  if (selectedItem && selectedCategory && selectedPrice && purchaseDate) {
    showAddButton = false;
    
    const newItem = {
      name: selectedItem,
      category: selectedCategory,
      price: parseFloat(selectedPrice.replace(',', '')),
      date: purchaseDate,
    };

    // Step 1: Add to groceries.json and groceries within IndexedDB if item doesn't exist
    const itemExists = groceries.some(grocery => grocery.name.toLowerCase() === selectedItem.toLowerCase());
    if (!itemExists) {
      try {
        const newGroceryKind = {
          name: newItem.name,
          category: newItem.category,
          price: newItem.price
        }
        // add new grocery kind to IndexedDB
        const db = await openDatabase();
        await db.put('groceries', newGroceryKind);
        console.log(`Grocery item added locally: ${newGroceryKind.name}`);
      } catch (error) {
        console.error('Error adding grocery to IndexedDB:', error);
      }

      try {
        const response = await fetch('/api/update_groceries.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newItem.name,
            category: newItem.category,
            price: newItem.price
          })
        });

        const result = await response.json();
        if (result.status === 'success') {
          await loadGroceries(); // Reload groceries data to include the newly added item
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error adding item to groceries:', error);
      }
    }

    // Step 2: Add to purchased items list in SQLite database
    try {
      const response = await fetch('/api/add_purchase.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify(newItem)
        // add new item to IndexedDB
      });
      const db = await openDatabase();
      await db.put('purchases', newItem);
      // const result = await response.json();
            // Get raw response to inspect it if something goes wrong
      const resultText = await response.text();
      console.log('Raw response:', resultText);

      // Try to parse JSON from the response
      const result = JSON.parse(resultText);




      if (result.status === 'success') {
        console.log("Item added to SQLite database successfully!");
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error adding item to database:', error);
    }

    // Add item to purchased list in the frontend
    purchasedItems = [
      ...purchasedItems,
      newItem
      ];

    // Sort purchased items by date after adding a new one
    purchasedItems = purchasedItems.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Reset selected item, category, and price
      selectedItem = "";
      selectedCategory = "";
      selectedPrice = "";
      purchaseDate = new Date().toISOString().split('T')[0];

      showInputs = false; // Hide input fields
      showCalculator = false; // Hide calculator if open


      // Show notification for item added
      showNotification = true;
      setTimeout(() => {
        showNotification = false;
        showAddButton = true;
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



  // Handle selecting a purchased item from the list
  function selectPurchasedItem(itemId) {
    highlightedItemId = highlightedItemId === itemId ? null : itemId;
    itemToDelete = highlightedItemId;
  }

  function showDeleteButton(itemId) {
    itemToDelete = itemId;
  }

  function hideDeleteButton(event) {
    if (!event.target.closest('.purchased-item') && !event.target.closest('.delete-btn')) {
      highlightedItemId = null;
      itemToDelete = null;
    }
  }

  // Attach and detach the event listener to avoid memory leaks
  onMount(() => {
    document.addEventListener('click', hideDeleteButton);
  });

  onDestroy(() => {
    document.removeEventListener('click', hideDeleteButton);
  });

  // Function to delete a purchased item
  async function deleteItem(itemId) {
    try {
      // First update the UI immediately for better user experience
      purchasedItems = purchasedItems.filter(item => item.id !== itemId);

      // Then delete from database
      const response = await fetch('/api/delete_purchase.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: itemId })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        // purchasedItems = purchasedItems.filter(item => item.id !== itemId);
        console.log("Item deleted successfully.");
      } else {
        console.error(result.message);
      }

      // Also delete from IndexedDB
      const db = await openDatabase();
      await db.delete('purchases', itemId);
    } catch (error) {
      console.error('Error deleting item:', error);
    }

  }

  // Sort unique dates in descending order
  function getSortedUniqueDates() {
    // Get unique dates from purchasedItems and sort them in descending order
    return Array.from(new Set(purchasedItems.map(item => item.date)))
      .sort((a, b) => new Date(b) - new Date(a));
  }

  // Handle calculator button click
  function onCalculatorButtonClick(value) {
    if (value === "C") {
      selectedPrice = "";
    } else if (value === "Del") {
      selectedPrice = selectedPrice.slice(0, -1);
    } else if (value === "000") {
      selectedPrice += "000";
    } else {
      selectedPrice += value;
    }
  }

  function handlePriceFocus(event) {
    showCalculator = true;

    // Position the calculator below the input and align with the left edge of the screen
    const { bottom } = event.target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    calculatorPosition = {
      top: `${bottom + window.scrollY + 5}px`,
      left: `5px`, // Align to the screen edge to ensure it’s not cut off
    };

    // Prevent keyboard from showing by blurring the input immediately
    event.target.blur();
  }

  function handleClickOutside(event) {
    const calculatorEl = document.querySelector('.calculator');
    if (
      !event.target.closest('.calculator') &&
      !event.target.closest('#price')
    ) {
      showCalculator = false;
    }
  }

  function closeCalculator() {
    showCalculator = false;
  }

  // Prevent iOS keyboard from showing when calculator is open
  function preventFocus(event) {
    event.preventDefault();
  }

  // Attach and detach the event listener to avoid memory leaks
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });


</script>

<main>
  <h1>Grocery</h1>

  <!-- Notification Section -->
  {#if showNotification}
    <div class="notification">Item added to purchased list!</div>
  {/if}

  <!-- Plus Button to Show Inputs -->
  {#if !showInputs}
    <button class="plus-button" on:click={() => (showInputs = true)}>+</button>
  {/if}

  <!-- Input Fields for Adding Items -->
  {#if showInputs}
    <div class="input-section">
      <!-- Input for search and dropdown -->
      <div class="item-name">
        <input
          type="text"
          bind:value={selectedItem}
          on:input={filterItems}
          on:focus={showAllItemsOnFocus}
          on:blur={hideDropdown}
          placeholder="Type to search or add item"
          autocomplete="off"
        />
        {#if showDropdown}
          <ul class="dropdown">
            {#each filteredItems as item}
              <li>
                <button type="button" on:click={() => selectItem(item.name)}>{item.name}</button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <!-- Input for Category and dropdown for category list -->
      <div class="category-input" style="position: relative;">
        <label for="category">Category:</label>
        <input
          type="text"
          bind:value={selectedCategory}
          on:input={filterCategories}
          on:focus={showAllCategoriesOnFocus}
          on:blur={hideCategoryDropdown}
          placeholder="Select or type category"
          autocomplete="off"
        />
        {#if showCategoryDropdown}
          <ul class="dropdown">
            {#each filteredCategories as category}
              <li>
                <button type="button" on:click={() => selectCategory(category)}>{category}</button>
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <!-- Inputs for Price and Date (User can edit them) -->
      <div>
        <label for="price">Price:</label>
        <input 
          type="tel" 
          id="price" 
          bind:value={selectedPrice}
          on:focus={handlePriceFocus}
          readonly
        />

        <label for="date">Purchase Date:</label>
        <input type="date" id="date" bind:value={purchaseDate} />
      </div>

      <!-- Button to add to purchased list -->
      {#if showAddButton}
        <button 
          class:fade-out={!showAddButton} 
          on:click={addToPurchasedList}
        >
          Add to Purchased List
        </button>
      {/if}

      <!-- Calculator Component -->
      {#if showCalculator}
      <div 
        class="calculator"
        style="top: {calculatorPosition.top}; left: {calculatorPosition.left};"
        >
        <div class="calculator-grid">
          {#each [["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"], ["C", "0", "000"]] as row}
            <div class="calculator-row">
              {#each row as button}
                <button 
                  class="calc-button" 
                  on:click={() => onCalculatorButtonClick(button)}
                >
                  {button}
                </button>
              {/each}
            </div>
          {/each}
          <div class="calculator-row">
            <button 
              class="calc-button del-btn" 
              on:click={() => onCalculatorButtonClick('Del')}
            >
              ⌫
            </button>
            <div class="spacer"></div>
            <button 
              class="calc-button ok-btn" 
              on:click={closeCalculator}
            >
              OK
            </button>
          </div>
        </div>
      </div>
      {/if}
      <!-- Button to refresh groceries data manually -->
      <!-- <button on:click={loadGroceries}>Refresh Groceries</button> -->

    </div>
  {/if}

  <!-- Grouped List of Purchased Items -->
  <h2>Purchased Items</h2>
  <!-- Show refresh notification -->
  {#if showRefreshMessage}
    <div class="refresh-message">
      {refreshMessage}
    </div>
  {/if}

  {#each getSortedUniqueDates() as date}
    <div class="purchase-group">
      <div class="purchase-header">
        <strong>
          {date === new Date().toISOString().split("T")[0] ? "Today" : date}
        </strong>
        <span class="total-amount">
          Total: Rp {parseFloat(calculateTotalAmount(date)).toLocaleString()}
        </span>
      </div>
      <ul class="purchased-items-list">
        {#each purchasedItems.filter((item) => item.date === date) as item, index}
          <li data-id={item.id} class="purchased-item {highlightedItemId === item.id ? 'highlighted' : ''}" on:click={() => selectPurchasedItem(item.id)}>
            <div class="item-content">
              <span class="item-number">{index + 1}.</span>
              <span class="item-details">{item.name} - {item.category}</span>
              <span class="item-price">Rp {item.price.toLocaleString()}</span>
              {#if itemToDelete === item.id}
                <button class="delete-btn" on:click={(e) => { e.stopPropagation(); deleteItem(item.id); }}>
                  🗑️
                </button>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</main>

<style>
  main {
    max-width: 90%;
    width: 600px;
    margin: 0 auto;
    padding: 7px;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* Enables smooth scrolling on iOS */
  }
  * {
    box-sizing: border-box;
  }
  label,
  h2 {
    display: block;
    margin-top: 0;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .plus-button {
    margin: 10px auto; /* Adjust margin to fit mobile screens */

    font-size: 2.5rem; /* Keeps the plus sign visible but adjust based on preference */
    width: 70px; /* Set width to make it smaller */
    height: 70px; /* Set height equal to width to form a perfect circle */
    padding: 0; /* Remove padding to avoid making it larger */
    border: none;
    /* background: #444; */
    background: linear-gradient(135deg, #32CD32, #228B22);
    color: white;
    cursor: pointer;
    text-align: center;
    border-radius: 50%; /* Make it a perfect circle */
    transition: background 0.3s, transform 0.2s;
    display: flex; /* Center the "+" sign */
    align-items: center; /* Vertical centering */
    justify-content: center; /* Horizontal centering */
    margin: 20px auto; /* Center the button horizontally */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  .plus-button:hover {
    /* background: #555; */
    transform: scale(1.1); /* Slight zoom effect for interaction feedback */
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  }

  .plus-button:active {
    transform: scale(0.95);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  }

  .input-section {
    margin-top: 7px;
  }

  .item-name, .category-input {
    position: relative;
    width: 100%;
  }

  input {
    width: 80%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: box-shadow 0.2s;
  }

  input:focus {
    box-shadow: 0px 0px 10px rgba(50, 205, 50, 0.5);
    outline: none;
  }

  button {
    width: 100%;
    padding: 5px;
    /* margin-bottom: 10px; */
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.5s ease-in-out;
    background: linear-gradient(135deg, #32CD32, #228B22);
    color: white;
  }

  .fade-out {
    opacity: 0;
    pointer-events: none; /* Prevent clicking while fading out */
  }

  .dropdown {
    list-style-type: none;
    padding: 0;
    margin: 5px;
    border: 1px solid #ccc;
    max-height: 300px;
    overflow-y: auto;
    background: #333; /* Update background color to match the theme */
    position: absolute;
    width: 100%; /* Set width to match the input field */
    z-index: 10;
    font-size: 1rem; 
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
    /* border-radius: 4px; */
  }

  .dropdown li {
    margin: 0; /* Remove default margin */
  }

  .dropdown button {
    width: 100%;
    padding: 2px 8px;
    /* background: #444;  */
    background: none; /* Remove default button background */
    color: white;
    border: none;
    text-align: left; /* Align text to the left */
    font-size: 1rem; 
    cursor: pointer;
  }

  .dropdown button:hover {
    background: #444; /* Darker shade on hover for better visual feedback */
  }

  .dropdown button:focus {
    outline: none; /* Remove default outline on focus */
    background: #555; /* Change background color when focused for accessibility */
    border-left: 3px solid #888; /* Optional: Add a visual indicator when focused */
  }

  .dropdown button:active {
    background: #666; /* A slightly different shade when button is pressed */
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
    list-style-type: none;
    padding: 0;
  }

  li {
    cursor: pointer;
    margin: 2px 0;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.3s ease;
  }

  .refresh-message {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    margin-bottom: 15px;
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
    color: white;
    background-color: #555;
  }

  .total-amount {
    font-weight: bold;
  }


  .item-content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between; /* Adjust to distribute elements evenly */
    position: relative;
    flex-wrap: wrap; /* Allow items to wrap if they don't fit */
  }

  .item-number {
    margin-right: 7px;
    font-size: 0.8rem;
  }

  .item-details {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 60%; /* Adjust this to ensure the detail takes up an appropriate amount of space */
    text-align: left;
    text-align: left;
    font-size: 0.8rem;
  }

  .item-price {
    text-align: right;
    width: 100px;
    font-size: 0.8rem;
  }

  /* Handle item content text */
.item-number,
.item-details,
.item-price {
  font-size: 0.8rem; /* Make text smaller to fit better */
  white-space: nowrap; /* Prevent breaking to new lines */
  overflow: hidden;
  text-overflow: ellipsis; /* Use ellipsis for overflowed text */
}

  .list-item {
    position: relative;
    transition: all 0.3s ease;
  }

  .purchased-item {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    background: #333;
    border: none;
    border-radius: 8px;
    margin-bottom: 8px;
    transition: all 0.3s ease;
    display: flex; /* To hold the item-content and delete button */
    align-items: center;
    color: white;
    overflow: hidden; /* Prevent content from overflowing */
  }

  .purchased-item:hover {
    background-color: #444;
  }


  .purchased-item:active {
    transform: scale(0.98);
  }

  .purchased-item.selected {
    background: #444;
  }

  .purchased-items-list {
    list-style-type: none;
    overflow-x: hidden; /* Prevent horizontal scrolling */
    width: 100%; /* Ensure it takes the full width of the container */
    box-sizing: border-box; /* Include padding and borders in the width */
    padding-left: 0;
    margin-left: 0; /* Remove any unwanted left margin */
  }

  .highlighted {
    background-color: #555;
  }

  .delete-btn {
    background: #ff4444; /* Red color */
    color: white; /* White trash icon */
    width: 30px; /* Set fixed width */
    height: 30px; /* Set fixed height */
    border: none;
    border-radius: 50%; /* Make it round */
    font-size: 1rem;
    cursor: pointer;
    position: absolute; /* Position it properly */
    right: 10px; /* Align it on the right side */
    top: 50%; /* Center vertically */
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 100; /* Make sure it appears on top of other elements */
    }

  .delete-btn:hover {
    background: #ff2222; /* Darker red for hover effect */
  }


  @keyframes slideOut {
    to {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  .calculator {
    width: calc(100% - 10px); /* Make it almost full width with small margin */
    max-width: 300px;
    background: #222;
    border-radius: 10px;
    padding: 10px;
    z-index: 10;
    position: absolute;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  .calculator-grid {
    display: grid;
    gap: 8px;
  }

  .calculator-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .spaced-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .calc-button.delete-btn,
  .calc-button.ok-btn {
    flex: 1; /* Make both buttons occupy equal space */
  }

  .spacer {
    flex: 0.3; /* Control the empty space between Delete and OK buttons */
  }

  .calc-button {
    padding: 12px;
    font-size: 1.2rem;
    border: none;
    border-radius: 8px;
    background: #32CD32;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
  }

  .calc-button:hover {
    background: #228B22;
  }

  .calc-button:active {
    transform: scale(0.98);
  }

  .calc-button.span-half {
    grid-column: span 1; /* Take up half the row each */
  }

  .calc-button.ok-btn {
    background: #32CD32; /* OK button background */
  }

  .calc-button.del-btn {
    background: #ff4444; /* Delete button background */
  }


  @media (max-width: 768px) {
    main {
      width: 100%;
      max-width: 100%;
      padding: 10px; /* Reduce padding for smaller screens */
    }

    .plus-button {
      width: 60px;
      height: 60px;
      font-size: 2.5rem; /* Adjust font size for smaller screens */
    }

    /* .purchase-header {
      flex-direction: column; 
      align-items: flex-start;
    } */

    .item-price {
      text-align: left; /* Ensure better alignment on smaller screens */
      width: auto;
    }

    .calculator {
      max-width: 100%;
    }

    .calc-button {
      padding: 7px 7px;
    }
  }
</style>
