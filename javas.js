const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let intervalTitle = null;
let intervalSub = null;

// Function to run on mouseover and every second for "sub" element
function updateTextSub(element) {
  let iteration = 0;

  clearInterval(intervalSub);

  intervalSub = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return element.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= element.dataset.value.length) {
      clearInterval(intervalSub);
      // Once the "sub" interval is complete, start the "title" interval again
      updateTextTitle(document.getElementById("title"));
    }

    iteration += 1;
  }, 49);
}

// Function to run every second for "title" element
function updateTextTitle(element) {
  let iteration = 0;

  clearInterval(intervalTitle);

  intervalTitle = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return element.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= element.dataset.value.length) {
      clearInterval(intervalTitle);
      // Once the "title" interval is complete, start the "sub" interval
      document.getElementById("sub").addEventListener("mouseover", () => {
        updateTextSub(document.getElementById("sub"));
      });
    }

    iteration += 1;
  }, 49);
}

// Start the initial interval for "title" element
updateTextTitle(document.getElementById("title"));

// Function to start the intervals again every 4 seconds
function startIntervals() {
  updateTextTitle(document.getElementById("title"));
  setTimeout(() => {
    updateTextSub(document.getElementById("sub"));
  }, 4000);
}

// Start the intervals every 4 seconds
setInterval(startIntervals, 4000);
