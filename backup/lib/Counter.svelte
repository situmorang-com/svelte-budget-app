<script>
    let count = 0;
  
    function increment() {
      count += 1;
    }
  </script>
  
  <button on:click={increment}>
    Count is {count}
  </button>
  
  <style>
    button {
      font-size: 1.5rem;
      padding: 10px;
      margin-top: 10px;
    }
  </style>
  