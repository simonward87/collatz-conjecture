<script lang="ts">
  import collatz from '../utils/calc';
  import validate from '../utils/validate';

	let checked = true;
  let input = '';
  let results: Result[] = [];
  let warned = false;

  interface Result {
    input: number;
    steps: number;
    ceiling: number;
  }

  function handleSubmit() {
    const inputNumber = parseInt(input);
    const invalid = validate(input, warned, checked);

    warned = invalid || warned;
    if (inputNumber < 1 || invalid) return;

    input = undefined;
    results = [];
    
    if (checked) {
      for (let i = 1; i <= inputNumber; i++) {
        const result = collatz(i);

        results.push(result);
      }
    } else {
      results.push(collatz(inputNumber));
    }
  }
</script>

<style>
	:global(html) {
		font-size: 18px;
	}

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
		font-family: 'Fira Sans', sans-serif;
    color: #323232;
    line-height: 1.5;
    margin: 0;
  }

  :global(h1) {
    color: #161616;
    font-size: calc(1rem * 1.3 * 1.3);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  main {
    margin: 1.5rem auto 3rem;
    max-width: 600px;
    padding: 0 1.5rem;
  }

  @media screen and (min-width: 600px) {
    main {
      margin: 3rem auto 6rem;
    }
  }

  table {
    /* background: pink; */
    margin: 1.5rem 0;
    width: 100%;
  }

  th {
    /* padding: 0 0.75rem 0.75rem; */
    padding: 0 0 0.75rem;
    text-align: left;
    line-height: 1.2;
  }

  tr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    border-bottom: 1px solid #EAEAEA;
  }

  tr:last-of-type {
    border-bottom: none;
  }

  #head-row {
    border-bottom: none;
    color: #161616;
  }

  td {
    /* border-bottom: 1px solid #EAEAEA; */
    padding: 0.375rem 0;
  }

  .container {
    display: flex;
    /* flex-wrap: wrap; */
    gap: 0.75rem;
    margin: 0.75rem 0;
  }

  button {
    border: 2px solid #161616;
    font-size: inherit;
    background: #161616;
    /* flex-grow: 1; */
    line-height: 1;
		font-family: inherit;
    color: #FFFFFF;
    outline: none;
    /* padding: 0.375rem 0.75rem; */
    padding: 0.75rem;
    transition: background 600ms ease, color 600ms ease;
  }

  button:hover,
  button:focus {
    background: #FFFFFF;
    color: #161616;
    cursor: pointer;
    transition: background 150ms ease, color 150ms ease;
  }

  .text-input {
    background: #EAEAEA;
    border: 2px solid #EAEAEA;
		border-radius: 0;
    font-size: inherit;
    flex-grow: 1;
    flex-shrink: 1;
		font-family: inherit;
    outline: none;
    box-shadow: none;
    /* padding: 0.375rem 0.75rem; */
    padding: 0.375rem 0.75rem;
    transition: background 600ms ease, border 600ms ease;
    /* max-width: 100%; */
  }

  .text-input:hover,
  .text-input:focus,
  .text-input:active {
    background: #FFFFFF;
    border: 2px solid #161616;
    transition: background 150ms ease, border 150ms ease;
  }
  
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

	input[type=number] {
			-moz-appearance:textfield;
	}
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<main>
  <h1>Collatz Conjecture</h1>

  <form on:submit|preventDefault="{handleSubmit}">
    <div class="container">
      <input class="text-input" size="2" type="number" bind:value={input}/>

      <button type="submit">Submit</button>
    </div>
		<div>
			<label for='leading'>Show leading numbers?</label>
			<input type="checkbox" id="leading" name="leading" bind:checked={checked} />
		</div>
  </form>

  {#if results.length > 0}
    <table>
      <thead>
        <tr id="head-row">
          <th>Number</th>
          <th>Steps required to reach 1</th>
          <th>Highest number reached</th>
        </tr>
      </thead>

      <tbody>
				{#if checked}
          {#each results as {input, steps, ceiling}, i (i)}
						<tr class:alt={i % 2 === 0}>
							<td>{input}</td>
							<td>{steps}</td>
							<td>{ceiling}</td>
						</tr>
					{/each}
				{:else}
					<tr>
						<td>{results[results.length - 1].input}</td>
						<td>{results[results.length - 1].steps}</td>
						<td>{results[results.length - 1].ceiling}</td>
					</tr>
				{/if}
      </tbody>
    </table>
  {/if}
</main>
