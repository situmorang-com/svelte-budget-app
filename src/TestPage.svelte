<svelte:head>	
<link href="https://cdn.jsdelivr.net/npm/daisyui@2.11.0/dist/full.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

// add text here if REPL preview is empty 

<script>
  let isDropdownOpen = false // default state (dropdown close)

  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen // togle state on click
  }

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
    // use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
    if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null) 
    isDropdownOpen = false
  }
</script>

<div class="flex justify-between items-center">
	<div class="dropdown" on:focusout={handleDropdownFocusLoss}>
		<button class="btn m-1" on:click={handleDropdownClick} >
		{#if isDropdownOpen}
			<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-6 w-6 stroke-current">
								<title>Close Dropdown</title>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12" />
							</svg>
			{:else}
			<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-6 w-6 stroke-current">
								<title>Open Dropdown</title>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16" />
							</svg>
			{/if}
		</button>
		<ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" style:visibility={isDropdownOpen ? 'visible' : 'hidden'}>
			<li><button class="btn text-slate-300">Item 1</button></li>
			<li><button class="btn text-slate-300">Item 2</button></li>
		</ul>
	</div>
	<p class="text-slate-300">
		isDropdownOpen: {isDropdownOpen}
	</p>
</div>