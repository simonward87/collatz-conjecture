let allowLargeInputs = document.querySelector("input[name=leading]");
let displayedWarning = false;
let showLeadingNumbers = allowLargeInputs.checked;
let lastCalculated = 0;

allowLargeInputs.addEventListener("change", function () {
  showLeadingNumbers = allowLargeInputs.checked;
  if (lastCalculated) {
    renderResults(compileResults(lastCalculated));
  }
});

document.querySelector("form").addEventListener("submit", handleSubmit);

/** Handle input submission.
 * @param {Event} event - Event that takes place on EventTarget.
 */
function handleSubmit(event) {
  event.preventDefault();
  const input = getInputNumber();

  validate(input);
  document.querySelector(".text-input").value = "";
  if (input < 1) {
    return;
  }
  renderResults(compileResults(input));
}

/** Structure calculated results.
 * @param {number} limit - Ceiling limit provided by user.
 */
function compileResults(limit) {
  lastCalculated = limit;
  if (!showLeadingNumbers) {
    return [calculate(limit)];
  }
  const results = [];
  for (let i = 1; i <= limit; i++) {
    results.push(calculate(i));
  }
  return results;
}

/** Render structured results to DOM.
 * @param {Array<{input:number, steps:number, ceiling: number}>} results - Structured results to be rendered.
 * @param {number} results[].input - The base input value.
 * @param {number} results[].steps - The number of steps required to reach 1.
 * @param {number} results[].ceiling - The highest number reached during steps.
 */
function renderResults(results) {
  const table = document.querySelector("table");
  const tbody = document.querySelector("tbody");
  let tr;

  table.classList.contains("hidden") && table.classList.remove("hidden");
  tbody.innerHTML = "";

  for (const { input, steps, ceiling } of results) {
    tr = tbody.insertRow();
    tr.insertCell().textContent = input;
    tr.insertCell().textContent = steps;
    tr.insertCell().textContent = ceiling;
  }
}

/** Gets and parses input number from form input. */
function getInputNumber() {
  const inputRef = document.querySelector(".text-input");
  const input = parseInt(inputRef.value);

  if (isNaN(input) || input < 1) return 0;

  return input;
}

/**
 * Validate input numbers.
 * @param {number} input - Target number provided by user.
 */
function validate(input) {
  if (!displayedWarning && showLeadingNumbers && input >= 2000) {
    alert(
      "Large numbers take longer to compute (they may even crash your browser)",
    );
    displayedWarning = true;
  }
}

/**
 * Calculate Collatz conjecture.
 * @param {number} input - Ceiling limit provided by user.
 */
function calculate(input) {
  let inputCopy = input;
  let steps = 0;
  let ceiling = input;

  while (inputCopy > 1) {
    if (inputCopy % 2 === 0) {
      inputCopy /= 2;
    } else {
      inputCopy = inputCopy * 3 + 1;
    }
    if (inputCopy > ceiling) {
      ceiling = inputCopy;
    }
    steps++;
  }
  return { input, steps, ceiling };
}
