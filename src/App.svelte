<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { openDB } from "idb";
  import { writable } from "svelte/store";

  let groceries: any[] = [];
  let filteredItems: any[] = [];
  let selectedItem: string = "";
  let selectedCategory: string = "";
  let selectedPrice: string = "";
  let selectedQuantity: number = 1;
  let showDropdown: boolean = false;
  let showCategoryDropdown: boolean = false;
  let categoryList: string[] = [];
  let filteredCategories: string[] = [];
  let purchasedItems: any[] = [];
  let purchaseDate: string = new Date().toISOString().split("T")[0];
  let showNotification: boolean = false;
  let showInputs: boolean = false; // Controls visibility of inputs
  let showAddButton: boolean = true; // State to control button visibility
  let showCalculator: boolean = false;
  let calculatorPosition: { top: string; left: string } = {
    top: "0px",
    left: "0px",
  };
  let highlightedItemId: number | null = null; // Track which purchased item is highlighted
  let itemToDelete: number | null = null; // Track which item is pending deletion
  let showBudgetModal: boolean = false;
  let modalPosition: { top: string; left: string } = {
    top: "0px",
    left: "0px",
  };
  let budgetAmount: number = 0;
  let budgetDate: string = new Date().toISOString().split("T")[0];
  let budget: { date: string; amount: number }[] = [];
  let budgetTotal = writable(0);
  let isOnline = writable(navigator.onLine);
  let addBudgetMessage = writable(""); // Store to display messages to the user
  let notificationMessage = "";
  let db: IDBPDatabase<any> | undefined;

  function clearSelectedItem() {
    selectedItem = "";
    showDropdown = false;
  }

  function clearSelectedCategory() {
    selectedCategory = "";
    showCategoryDropdown = false;
  }

  // Open or create an IndexedDB local device storage database
  async function openDatabase(retryCount = 0) {
    try {
      db = await openDB("budget-management", 4, {
        upgrade(db, oldVersion) {
          if (!db.objectStoreNames.contains("purchases")) {
            db.createObjectStore("purchases", {
              keyPath: "id",
              autoIncrement: true,
            });
          }

          if (!db.objectStoreNames.contains("budget")) {
            db.createObjectStore("budget", {
              keyPath: "id",
              autoIncrement: true,
            });
          }

          if (!db.objectStoreNames.contains("groceries")) {
            db.createObjectStore("groceries", { keyPath: "name" });
          }

          if (oldVersion < 4 && !db.objectStoreNames.contains("pendingSyncs")) {
            db.createObjectStore("pendingSyncs", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
    } catch (error) {
      console.error("Failed to open database:", error);
      if (retryCount < 3) {
        setTimeout(
          () => openDatabase(retryCount + 1),
          1000 * Math.pow(2, retryCount),
        ); // Exponential backoff
      } else {
        showNotificationMessage(
          "Failed to open database. Please refresh the page or try again later.",
        );
      }
    }
  }

  async function storePendingSync(type: string, data: { date: string; amount?: number; name?: string; category?: string; price?: number; quantity?: number; }) {
    const tx = db.transaction("pendingSyncs", "readwrite");
    await tx.objectStore("pendingSyncs").put({ type, data });
  }

  async function processPendingSyncs() {
    if (isOnline) {
      showNotificationMessage("Syncing data with server...");
      // updateNetworkStatus();

      try {
        const tx = db.transaction("pendingSyncs", "readonly");
        const pendingSyncs = await tx.objectStore("pendingSyncs").getAll();

        for (const syncData of pendingSyncs) {
          const { type, data } = syncData;

          try {
            if (type === "budget") {
              await addBudgetToServer(data);
              await fetchBudget(); // Fetch latest budget data after successful sync
            } else if (type === "purchases") {
              await addPurchaseToServer(data);
              await fetchPurchases(); // Fetch latest purchases after successful sync
            } else if (type === "groceries") {
              await addGroceryToServer(data);
              await fetchGroceries(); // Fetch latest groceries after successful sync
            }

            // If sync was successful, remove from pendingSyncs
            const deleteTx = db.transaction("pendingSyncs", "readwrite");
            await deleteTx.objectStore("pendingSyncs").delete(syncData.id);
          } catch (error) {
            console.error(`Error processing sync for type ${type}:`, error);
          }
        }

        showNotificationMessage("Data successfully synced with the server.");
      } catch (error) {
        console.error("Error processing pending syncs:", error);
        showNotificationMessage("Failed to sync data. Will retry later.");
      }
    }
  }

  async function addBudgetToServer(budgetData: { date: string; amount: number; }) {
    try {
      const response = await fetch("/api/add_budget.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(budgetData),
      });

      const result = await response.json();
      if (result.status !== "success") {
        throw new Error("Failed to add budget to server");
      }
    } catch (error) {
      console.error("Error adding budget to server:", error);
      await storePendingSync("budget", budgetData);
      throw error;
    }
  }

  // Additional addPurchaseToServer and addGroceryToServer functions...
  async function addPurchaseToServer(purchaseData: {
          name: string; category: string; price: number; // Ensure price is parsed as a number
          quantity: number; // Convert to number with default value of 1
          date: string;
      }) {
    try {
      const response = await fetch("/api/add_purchase.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      const result = await response.json();
      if (result.status !== "success") {
        throw new Error("Failed to add purchase to server");
      }
    } catch (error) {
      console.error("Error adding purchase to server:", error);
      // Store in pending syncs if it fails
      await storePendingSync("purchases", purchaseData);
    }
  }

  async function addGroceryToServer(groceryData: any) {
    try {
      const response = await fetch("/api/add_grocery.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groceryData),
      });

      const result = await response.json();
      if (result.status === "success") {
        await fetchGroceries(); // Reload groceries data to include the newly added item
      } else {
        throw new Error("Failed to add grocery to server");
      }
    } catch (error) {
      console.error("Error adding grocery to server:", error);
      // Store in pending syncs if it fails
      await storePendingSync("groceries", groceryData);
    }
  }

  async function fetchBudget() {
    try {
      const response = await fetch("/api/get_budget_history.php");
      const result = await response.json();

      if (result.status === "success") {
        budget = result.data;
        updateBudgetTotal();
      } else {
        console.error(
          "Failed to fetch budget history from server:",
          result.message,
        );
      }
    } catch (error) {
      console.error("Error fetching budget history:", error);
    }
  }

  async function fetchPurchases() {
    try {
      const response = await fetch("/api/get_purchases.php");
      const result = await response.json();

      if (result.status === "success") {
        purchasedItems = result.data;
        updateBudgetTotal();
      } else {
        console.error(
          "Failed to fetch purchased items from server:",
          result.message,
        );
      }
    } catch (error) {
      console.error("Error fetching purchased items:", error);
    }
  }

  async function fetchGroceries() {
    try {
      const response = await fetch(
        "/api/get_groceries.php?t=" + new Date().getTime(),
        {
          cache: "no-cache",
        },
      );
      const result = await response.json();

      if (result.status === "success" && Array.isArray(result.groceries)) {
        groceries = result.groceries;

        // Sort groceries alphabetically by name
        groceries = groceries.sort((a, b) => a.name.localeCompare(b.name));

        // Extract unique categories
        categoryList = Array.from(
          new Set(groceries.map((item) => item.category)),
        ).sort();

        filteredItems = groceries; // Set the filtered items to the sorted list initially
        filteredCategories = categoryList; // Set filtered categories initially
        console.log (groceries);
      } else {
        console.error(
          "Failed to fetch groceries from server:",
          result.message || "Unexpected data format",
        );
      }
    } catch (error) {
      console.error("Error fetching groceries:", error);
    }
  }

  function handleOnline() {
    isOnline.set(true);
    processPendingSyncs();
    setupServerSentEvents(); // Reconnect SSE when back online
  }

  function handleOffline() {
    isOnline.set(false);
    showNotificationMessage(
      "You are offline. Changes will be synced once you're online.",
    );
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
      filteredItems = groceries.filter((item) =>
        item.name.toLowerCase().includes(selectedItem.toLowerCase()),
      );
    }
    showDropdown = filteredItems.length > 0;
  }

  // Filter categories based on user input
  function filterCategories() {
    if (selectedCategory.trim() === "") {
      filteredCategories = categoryList; // If input is empty, show all categories
    } else {
      filteredCategories = categoryList.filter((category) =>
        category.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }
    showCategoryDropdown = filteredCategories.length > 0;
  }

  // Handle selecting an item
  function selectItem(itemName: string) {
    selectedItem = itemName;
    showDropdown = false;
    updateSelection(itemName);
  }

  // Handle selecting a category from dropdown
  function selectCategory(category: string) {
    selectedCategory = category;
    showCategoryDropdown = false; // Hide category dropdown after selection
  }

  // Update category and price when a matching item is selected
  function updateSelection(itemName: string) {
    const item = groceries.find(
      (grocery) => grocery.name.toLowerCase() === itemName.toLowerCase(),
    );
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

  // Calculate total amount of purchases for a given date
  function calculateTotalAmount(date: string): string {
    return purchasedItems
      .filter((item) => item.date === date)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }

  // Handle selecting a purchased item from the list
  function selectPurchasedItem(itemId: number | null) {
    highlightedItemId = highlightedItemId === itemId ? null : itemId;
    itemToDelete = highlightedItemId;
  }

  function showDeleteButton(itemId: number | null) {
    itemToDelete = itemId;
  }

  function hideDeleteButton(event: { target: { closest: (arg0: string) => any; }; }) {
    if (
      !event.target.closest(".purchased-item") &&
      !event.target.closest(".delete-btn")
    ) {
      highlightedItemId = null;
      itemToDelete = null;
    }
  }

  function showNotificationMessage(message:string) {
    notificationMessage = message;
    showNotification = true;

    setTimeout(() => {
      showNotification = false;
    }, 3000); // Hide notification after 3 seconds
  }

  // Function to delete a purchased item
  async function deleteItem(itemId: any) {
    try {
      // First update the UI immediately for better user experience
      purchasedItems = purchasedItems.filter((item) => item.id !== itemId);

      // Then delete from database
      const response = await fetch("/api/delete_purchase.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      });

      const result = await response.json();

      if (result.status === "success") {
        // purchasedItems = purchasedItems.filter(item => item.id !== itemId);
        console.log("Item deleted successfully.");
      } else {
        console.error(result.message);
      }

      // Also delete from IndexedDB
      await db.delete("purchases", itemId);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  // Sort unique dates in descending order
  function getSortedUniqueDates() {
    // Get unique dates from purchasedItems and sort them in descending order
    return Array.from(new Set(purchasedItems.map((item) => item.date))).sort(
      (a, b) => new Date(b) - new Date(a),
    );
  }

  function formatNumberWithCommas(value: string) {
    // Remove all non-digit characters
    let cleanedValue = value.replace(/[^\d]/g, "");

    // Add commas to the number
    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Handle calculator button click
  function onCalculatorButtonClick(value: string) {
    if (value === "C") {
      selectedPrice = "";
    } else if (value === "Del") {
      selectedPrice = selectedPrice.slice(0, -1);
    } else if (value === "000") {
      selectedPrice += "000";
    } else {
      selectedPrice += value;
    }

    // Format price with commas as the user types
    selectedPrice = formatNumberWithCommas(selectedPrice);
  }

  function handlePriceInput(event: { target: { value: any; }; }) {
    selectedPrice = formatNumberWithCommas(event.target.value);
  }
  function handlePriceFocus(event: { target: { getBoundingClientRect: () => any; blur: () => void; }; }) {
    showCalculator = true;

    // Get the position of the price input relative to the container
    const inputRect = event.target.getBoundingClientRect();
    const containerRect = document
      .querySelector(".input-section")
      .getBoundingClientRect();

    calculatorPosition = {
      top: `${inputRect.bottom - containerRect.top + 10}px`, // Add a slight gap of 10px below the input
      left: `${inputRect.left - containerRect.left}px`, // Align calculator directly under the input
    };

    // Prevent keyboard from showing by blurring the input immediately
    event.target.blur();
  }

  function handleClickOutside(event: { target: { closest: (arg0: string) => any; }; }) {
    const calculatorEl = document.querySelector(".calculator");
    if (
      !event.target.closest(".calculator") &&
      !event.target.closest("#price")
    ) {
      showCalculator = false;
    }
  }

  function closeCalculator() {
    showCalculator = false;
  }

  // Prevent iOS keyboard from showing when calculator is open
  function preventFocus(event: { preventDefault: () => void; }) {
    event.preventDefault();
  }

  // Function to show the budget modal and position it near the budget element
  function showBudgetModalPosition() {
    const budgetElement = document.querySelector(".budget-info");
    if (budgetElement) {
      const rect = budgetElement.getBoundingClientRect();
      modalPosition = {
        top: `${rect.bottom + window.scrollY + 10}px`,
        left: `${rect.left + window.scrollX}px`,
      };
      showBudgetModal = true;
    }
  }

  // Event handler to close the modal
  function closeBudgetModal() {
    showBudgetModal = false;
  }

  async function addBudget(amount: number, date: string) {
    if (amount > 0 && date) {
      const budgetData = { date, amount };
      try {
        // Update IndexedDB first
        const tx = db.transaction("budget", "readwrite");
        await tx.objectStore("budget").put(budgetData);

        // Update budget history in the UI
        budget = [...budget, budgetData].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        updateBudgetTotal();
        showBudgetModal = false;

        // Attempt to add to server
        await addBudgetToServer(budgetData);
        await fetchBudget(); // Fetch the latest budget history after successful upload
      } catch (error) {
        console.error("Error adding budget locally:", error);
        // If unable to add budget, store the sync task
        await storePendingSync("budget", budgetData);
        showNotificationMessage("Offline - Budget data will be synced later");
      }
    }
  }

  async function addPurchase() {
    if (selectedItem && selectedCategory && selectedPrice && purchaseDate) {
      showAddButton = false;

      const newItem = {
        name: selectedItem,
        category: selectedCategory,
        price: parseFloat(selectedPrice.replace(/,/g, "")) || 0, // Ensure price is parsed as a number
        quantity: parseInt(selectedQuantity.toString(), 10) || 1, // Convert to number with default value of 1
        date: purchaseDate,
      };

      // Step 1: Add to groceries.json and groceries within IndexedDB if item doesn't exist
      const itemExists = groceries.some(
        (grocery) => grocery.name.toLowerCase() === selectedItem.toLowerCase(),
      );
      if (!itemExists) {
        const newGrocery = {
          name: newItem.name,
          category: newItem.category,
          price: newItem.price,
        };
        // add new grocery kind to IndexedDB
        addGrocery(newGrocery);
      }
      // Step 2: Add to purchased items list in SQLite database
      try {
        // Update IndexedDB first
        const tx = db.transaction("purchases", "readwrite");
        await tx.objectStore("purchases").put(newItem);
        // await db.put("purchases", newItem); 

        // Add item to purchased list in the frontend
        purchasedItems = [...purchasedItems, newItem];

        // Sort purchased items by date after adding a new one
        purchasedItems = purchasedItems.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        updateBudgetTotal(-newItem.price * newItem.quantity);

        // Reset selected item, category, and price
        selectedItem = "";
        selectedCategory = "";
        selectedPrice = "";
        selectedQuantity = 1;
        purchaseDate = new Date().toISOString().split("T")[0];
        showAddButton = true;

        showInputs = false; // Hide input fields
        showCalculator = false; // Hide calculator if open
        showNotificationMessage(newItem.name + " is added to Purchased Items.")

        // Attempt to add to server
        await addPurchaseToServer(newItem);
      } catch (error) {
        console.error("Error adding purchase locally:", error);
        // Store in pending syncs if it fails
        await storePendingSync("purchases", newItem);
        showNotificationMessage("Offline - New Purchase data will be synced later");
      }
    } else {
      alert("Please fill in all fields, including date.");
    }
  }

  async function addGrocery(newGrocery: { name: any; category?: string; price?: number; }) {
    try {
      // Update IndexedDB first
      const tx = db.transaction("groceries", "readwrite");
      await tx.objectStore("groceries").put(newGrocery);

      groceries = [...groceries, newGrocery];

      // Attempt to add to server
      showNotificationMessage(newGrocery.name + " is added to Search List.")
      await addGroceryToServer(newGrocery);
    } catch (error) {
      console.error("Error adding grocery locally:", error);
      // Store in pending syncs if it fails
      await storePendingSync("groceries", newGrocery);
      showNotificationMessage(
        "Offline - New Grocery Category data will be synced later",
      );
    }
  }


  function setupServerSentEvents() {
    const eventSource = new EventSource("/api/data_updates.php");

    eventSource.onmessage = (event) => {
      try {
        const updatedData = JSON.parse(event.data);

        if (updatedData) {
          // Update purchases data
          if (updatedData.purchases) {
            purchasedItems = updatedData.purchases;
            console.log("Updated Purchases:", purchasedItems);
          }

          // Update budget total
          if (updatedData.budget && updatedData.budget.total !== undefined) {
            budgetTotal.set(updatedData.budget.total);
            console.log("Updated Budget Total:", updatedData.budget.total);
          }

          // Update groceries data
          if (updatedData.groceries) {
            groceries = updatedData.groceries;
            console.log("Updated Groceries:", groceries);
          }
        } else {
          console.warn("Received unexpected data from SSE:", event.data);
        }
      } catch (e) {
        console.error("Error parsing data from SSE:", e);
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection failed.");
      eventSource.close();
    };
  }

  async function loadGroceriesfromiDB() {
    try {
      if (db) {
        const tx = db.transaction("groceries", "readonly");
        const store = tx.objectStore("groceries");
        const groceriesData = await store.getAll();
        await tx.done;
        groceries = groceriesData;
        if (groceries.length === 0) {
          console.log("empty groceries in IndexedDB");
          await fetchGroceries();
          try {
            console.log ("trying to add")
            console.log (groceries);
            const tx = db.transaction("groceries", "readwrite");
            const store = tx.objectStore("groceries");
            for (const item of groceries) {
              console.log("Adding item to IndexedDB:", item);
              await store.put(item);
            }
            // await tx.done;
          } catch (error) {
            console.error("Error adding grocery locally:", error);
          }
        }
        // Sort groceries alphabetically by name
        groceries = groceries.sort((a, b) => a.name.localeCompare(b.name));
        console.log ("groeceries sorted")
        categoryList = Array.from(
          new Set(groceries.map((item) => item.category)),
        ).sort();
        
        filteredItems = groceries; // Set the filtered items to the sorted list initially
        filteredCategories = categoryList; // Set filtered categories initially
      }
    } catch (error) {
      console.error("Failed to load groceries data:", error);
    }
  }

  async function loadPurchasesfromiDB() {
    try {
      if (db) {
        const tx = db.transaction("purchases", "readonly");
        const store = tx.objectStore("purchases");
        purchasedItems = await store.getAll();
        await tx.done;
        if (purchasedItems.length === 0) {
          fetchPurchases();
          if (db) {
            const tx = db.transaction("purchases", "readwrite");
            const store = tx.objectStore("purchases");
            for (const item of purchasedItems) {
              await store.put(item);
            }
            await tx.done;
          }
        }
        purchasedItems = purchasedItems.sort(
            (a, b) => new Date(b.date) - new Date(a.date),
        );
      }
    } catch (error) {
      console.error("Failed to load purchases:", error);
    }
  }

  async function loadBudgetfromiDB() {
    try {
      if (db) {
        const tx = db.transaction("budget", "readonly");
        const store = tx.objectStore("budget");
        const budgetData = await store.getAll();
        budget = budgetData;
        await tx.done;
        if (budget.length === 0) {
          fetchBudget();
          if (db) {
            const tx = db.transaction("budget", "readwrite");
            const store = tx.objectStore("budget");
            for (const item of budget) {
              await store.put(item);
            }
            await tx.done;
          }
        }
        budget.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent
        updateBudgetTotal();
      }
    } catch (error) {
      console.error("Failed to load budget data:", error);
    }
  }

  function updateBudgetTotal() {
    budgetTotal.set(
      budget.reduce((total, entry) => total + entry.amount, 0) -
        purchasedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    );
  }

  onMount(async () => {
    await openDatabase();
    await loadGroceriesfromiDB();
    await loadBudgetfromiDB();
    await loadPurchasesfromiDB();
    processPendingSyncs();
    setupServerSentEvents();

    document.addEventListener("click", hideDeleteButton);
    document.addEventListener("click", handleClickOutside);

    // Add event listeners for online and offline
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  });

  onDestroy(() => {
    window.removeEventListener("offline", handleOffline);
    window.removeEventListener("online", handleOnline);
    document.removeEventListener("click", hideDeleteButton);
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<main>
  <h1>Grocery</h1>
  <div
    class="budget-info"
    role="button"
    tabindex="0"
    aria-label="Open budget modal"
    on:click={showBudgetModalPosition}
    on:keydown={(e) => e.key === "Enter" && showBudgetModalPosition()}
  >
    Budget: {#if $budgetTotal < 0}
      <span style="color: red;">Rp {$budgetTotal.toLocaleString()}</span>
    {:else}
      Rp {$budgetTotal.toLocaleString()}
    {/if}
  </div>

  <!-- Your UI for managing budgets, groceries, and purchases -->

  <!-- Notification Box -->
  {#if showNotification}
    <div class="notification-box">{notificationMessage}</div>
  {/if}

  <!-- Plus Button to Show Inputs -->
  {#if !showInputs}
    <button class="plus-button" on:click={() => (showInputs = true)}>+</button>
  {/if}

  <!-- Input Fields for Adding Items -->
  {#if showInputs}
    <div class="input-section">
      <!-- Input for Item Name and Dropdown -->
      <div class="input-wrapper">
        <label for="item-name">Item Name:</label>
        <input
          type="text"
          id="item-name"
          bind:value={selectedItem}
          on:input={filterItems}
          on:focus={showAllItemsOnFocus}
          on:blur={hideDropdown}
          placeholder="Type to search or add item"
          autocomplete="off"
        />
        {#if selectedItem}
          <button
            type="button"
            class="clear-btn"
            on:click={() => (selectedItem = "")}
          >
            ✕
          </button>
        {/if}
        {#if showDropdown}
          <ul class="dropdown">
            {#each filteredItems as item}
              <li>
                <button type="button" on:click={() => selectItem(item.name)}
                  >{item.name}</button
                >
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <!-- Input for Category and Dropdown -->
      <div class="input-wrapper">
        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          bind:value={selectedCategory}
          on:input={filterCategories}
          on:focus={showAllCategoriesOnFocus}
          on:blur={hideCategoryDropdown}
          placeholder="Select or type category"
          autocomplete="off"
        />
        {#if selectedCategory}
          <button
            type="button"
            class="clear-btn"
            on:click={() => (selectedCategory = "")}
          >
            ✕
          </button>
        {/if}
        {#if showCategoryDropdown}
          <ul class="dropdown">
            {#each filteredCategories as category}
              <li>
                <button type="button" on:click={() => selectCategory(category)}
                  >{category}</button
                >
              </li>
            {/each}
          </ul>
        {/if}
      </div>

      <div class="input-row">
        <!-- Price Input -->
        <div class="input-wrapper" style="width: 65%;">
          <label for="price">Price:</label>
          <input
            type="tel"
            id="price"
            bind:value={selectedPrice}
            on:focus={handlePriceFocus}
            on:input={handlePriceInput}
            readonly
          />
        </div>

        <!-- Quantity Input -->
        <div class="input-wrapper" style="width: 30%; margin-left: auto;">
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            bind:value={selectedQuantity}
            min="1"
          />
        </div>
      </div>

      <div class="input-wrapper">
        <label for="date">Purchase Date:</label>
        <input type="date" id="date" bind:value={purchaseDate} />
      </div>

      <!-- Button to add to purchased list -->
      {#if showAddButton}
        <button class:fade-out={!showAddButton} on:click={addPurchase}>
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
                    class="calc-button {typeof button === 'string' &&
                    !['C', '000', 'Del', 'OK'].includes(button)
                      ? 'number'
                      : ''}"
                    on:click={() => onCalculatorButtonClick(button)}
                  >
                    {button}
                  </button>
                {/each}
              </div>
            {/each}
            <div class="calculator-row full-row">
              <button
                class="calc-button delete"
                on:click={() => onCalculatorButtonClick("Del")}
              >
                ⌫
              </button>
              <button
                class="calc-button action-button"
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
      <div class="purchased-items-list">
        {#each purchasedItems.filter((item) => item.date === date) as item, index}
          <div
            role="button"
            tabindex="0"
            data-id={item.id}
            class="purchased-item {highlightedItemId === item.id
              ? 'highlighted'
              : ''}"
            on:click={() => selectPurchasedItem(item.id)}
            on:keydown={(e) =>
              e.key === "Enter" && selectPurchasedItem(item.id)}
          >
            <div class="item-content">
              <span class="item-number">{index + 1}.</span>
              <span class="item-details">{item.name} - {item.category}</span>
              {#if item.quantity > 1}
                <span class="quantity-box">{item.quantity}</span>
              {/if}
              <span class="item-price"
                >Rp {(item.price * item.quantity).toLocaleString()}</span
              >
              {#if itemToDelete === item.id}
                <button
                  class="delete-btn"
                  on:click={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                >
                  🗑️
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  <!-- Modal for Budget Management -->
  {#if showBudgetModal}
    <div
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      on:click={closeBudgetModal}
    >
      <div
        class="modal-content"
        role="document"
        on:click={(e) => e.stopPropagation()}
        on:keydown={(e) => e.key === "Escape" && closeBudgetModal()}
        tabindex="0"
      >
        <h3>Set New Budget</h3>
        <input
          type="number"
          bind:value={budgetAmount}
          min="0"
          placeholder="Enter budget amount"
        />
        <label for="budget-date">Budget Date:</label>
        <input type="date" id="budget-date" bind:value={budgetDate} />

        <button on:click={() => addBudget(budgetAmount, budgetDate)}
          >Add Budget</button
        >
        <h4>Budget History</h4>
        <ul>
          {#each budget as entry}
            <li>{entry.date}: Rp {entry.amount.toLocaleString()}</li>
          {/each}
        </ul>
        <button
          on:click={() => (showBudgetModal = false)}
          aria-label="Close modal">Close</button
        >
        {#if $addBudgetMessage}
          <div class="retry-message">{$addBudgetMessage}</div>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Online/Offline Indicator -->
  <div class="network-status-indicator {$isOnline ? 'online' : 'offline'}">
    {$isOnline ? "online" : "offline"}
  </div>
</main>

<style>
  main {
    max-width: 100%;
    width: 100%;
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

  label {
    font-size: 0.7rem;
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
    background: linear-gradient(135deg, #32cd32, #228b22);
    color: white;
    cursor: pointer;
    text-align: center;
    border-radius: 50%; /* Make it a perfect circle */
    transition:
      background 0.3s,
      transform 0.2s;
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
    position: relative;
    display: block;
    width: 100%;
  }

  .input-section input {
    width: 100%;
    padding-right: 30px; /* Ensure there is space for the clear button */
  }

  .input-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 3px; /* Add space between each input section */
  }

  .input-wrapper input {
    width: 100%;
    padding: 10px;
    padding-right: 30px; /* Space for the clear button */
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: box-shadow 0.2s;
  }

  .input-wrapper .dropdown {
    list-style-type: none;
    padding: 0;
    margin: 5px 0;
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
    background: #333; /* Update background color to match the theme */
    position: absolute;
    top: 100%; /* Place dropdown just below the input */
    left: 0;
    width: 100%; /* Set width to match the input field */
    z-index: 10; /* Ensure the dropdown appears on top of other elements */
    font-size: 1rem;
  }

  .clear-btn {
    position: absolute;
    right: 10px;
    top: 65%; /* Position it vertically centered */
    transform: translateY(-50%); /* Center it vertically within the input box */
    background: #ccc; /* Light background to make it look like a button */
    border: none;
    color: #fff;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%; /* Make it round */
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background 0.3s,
      transform 0.2s;
  }

  .clear-btn:hover {
    background: #888; /* Darken on hover for interaction feedback */
  }

  .clear-btn:active {
    transform: scale(0.9); /* Slightly shrink when pressed */
  }

  input {
    width: 80%;
    padding: 10px;
    margin-bottom: 0;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: box-shadow 0.2s;
  }

  input:focus {
    box-shadow: 0px 0px 10px rgba(50, 205, 50, 0.5);
    outline: none;
  }

  .input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 3px;
  }

  .quantity-box {
    display: inline-block;
    border: 1px solid #ccc;
    padding: 2px 4px;
    font-size: 0.8rem;
    border-radius: 4px;
    margin-left: 5px;
    margin-right: 5px; /* Space between quantity and price */
    align-self: center; /* Align quantity box next to total price */
  }

  button {
    width: 100%;
    padding: 5px;
    /* margin-bottom: 10px; */
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.5s ease-in-out;
    background: linear-gradient(135deg, #32cd32, #228b22);
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
    max-height: 150px;
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
    gap: 8px;
  }

  .full-row {
    display: flex;
    gap: 8px;
  }

  .calc-button {
    flex: 1; /* Make all buttons occupy equal width */
    padding: 12px;
    font-size: 1.2rem;
    border: none;
    border-radius: 8px;
    background: #32cd32;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
  }

  .calc-button.number {
    background: #ffa500; /* Orange color for number buttons */
  }

  .calc-button.number:hover {
    background: #ff8c00; /* Darker orange on hover for a better visual cue */
  }

  .calc-button.delete {
    background: #ff4444; /* Red color for the Delete button */
  }

  .action-button {
    flex: 1; /* Make both action buttons (Delete and OK) equal in size */
  }

  .calc-button:hover {
    background: #228b22;
  }

  .calc-button.delete:hover {
    background: #ff2222; /* Darker red for the Delete button when hovered */
  }

  .calc-button:active {
    transform: scale(0.98);
  }

  .budget-info {
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    font-size: 1.2rem;
    border: 2px solid #ccc; /* Add border */
    padding: 10px; /* Add padding for space inside the border */
    border-radius: 5px; /* Optional rounded corners */
    width: fit-content; /* Width adjusted to the content */
    margin: 10px auto; /* Center the element horizontally */
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: grey;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
  }

  .modal-content h3 {
    margin-top: 0;
  }

  .modal-content input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .modal-content button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background: linear-gradient(135deg, #32cd32, #228b22);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .modal-content ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }

  .modal-content li {
    margin-bottom: 5px;
  }

  .network-status-indicator {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
    color: #fff;
    font-size: 0.9rem;
    z-index: 1000; /* Make sure it is on top of other elements */
    pointer-events: none; /* Ignore pointer events */
    transition: opacity 0.3s ease-in-out;
  }

  .network-status-indicator.online {
    background: rgba(0, 128, 0, 0.7); /* Green color for online status */
  }

  .network-status-indicator.offline {
    background: rgba(255, 0, 0, 0.7); /* Red color for offline status */
  }

  .retry-message {
    margin-top: 10px;
    color: red; /* Indicate that it's a warning or error message */
    font-weight: bold;
  }

  .notification-box {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    z-index: 1000;
    transition: opacity 0.3s ease-in-out;
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
