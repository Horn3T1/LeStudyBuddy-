// script.js

// Array of quotes stored locally
const quotes = [
  { content: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { content: "Whether you think you can or think you can't, you're right.", author: "Henry Ford" },
  { content: "Act as if what you do makes a difference. It does.", author: "William James" }
];

// Function to display a new random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the DOM with the quote and its author
  document.getElementById("quote").textContent = `"${randomQuote.content}"`;
  document.getElementById("author").textContent = `- ${randomQuote.author}`;
}

// Add event listener for the button to fetch a new quote
document.addEventListener('DOMContentLoaded', () => {
  const newQuoteBtn = document.getElementById("new-quote-btn");
  newQuoteBtn.addEventListener("click", displayRandomQuote);

  // Display a quote when the page loads
  displayRandomQuote();
});
