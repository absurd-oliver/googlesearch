document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");

  // Show or hide clear button based on input value
  function toggleClearBtn() {
    clearBtn.style.display = searchInput.value.trim() ? "inline" : "none";
  }

  // Clear input when clear button is clicked
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    searchInput.focus();
  });

  // Update clear button visibility as user types
  searchInput.addEventListener("input", toggleClearBtn);

  // Initial check in case input has a value on page load
  toggleClearBtn();
});

async function performSearch(event) {
  event.preventDefault();
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const apiKey = "AIzaSyAonWg7ZCK3h-Jpl0_Sz-sHXwfsQLzygNA";
  const cx = "035a69efb41f84e96";
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsContainer.innerHTML = data.items.map(item => `
      <div class="result-item">
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
        <div class="result-snippet">${item.snippet}</div>
      </div>
    `).join("");

  } catch (error) {
    resultsContainer.innerHTML = `<p>Error fetching results.</p>`;
    console.error(error);
  }
}