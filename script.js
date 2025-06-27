// Wait for page to load
document.addEventListener("DOMContentLoaded" , () => {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const newQuoteBtn = document.getElementById("new-quote-button");
  const likeBtn = document.getElementById("like-btn");
  const likeCount = document.getElementById("like-count");
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.getElementById("comment-list");

  const baseURL = "http://localhost:3000";
  let currentQuote = {};
  let likes = 0;

  // Get a random quote from the local server
  async function loadQuote() {
    try { // checking for errors
      const response = await fetch(`${baseURL}/quotes`);
      const quotes = await response.json();

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      currentQuote = randomQuote;

      quoteText.textContent = `"${currentQuote.text}"`;
      quoteAuthor.textContent = `— ${currentQuote.author}`;

      likes = currentQuote.likes || 0;
      likeCount.textContent = likes;

      loadComments(currentQuote.id);
    } catch (err) { //if error occurs in try, switch to catch 
      quoteText.textContent = "Couldn't load quote.";
      quoteAuthor.textContent = "";
      console.error(err);
    }
  }

  // Show comments for the current quote
  async function loadComments(quoteId) {
    try {
      const response = await fetch(`${baseURL}/comments?quoteId=${quoteId}`);
      const comments = await response.json();

      commentList.innerHTML = "";
      comments.forEach(comment => {
        const li = document.createElement("li");
        li.textContent = comment.text;
        commentList.appendChild(li);
      });
    } catch (err) {
      console.error("Couldn't load comments:", err);
      commentList.innerHTML = "";
    }
  }

  // Handle liking a quote
  async function likeQuote() {
    likes++;
    likeCount.textContent = likes;

    try {
      await fetch(`${baseURL}/quotes/${currentQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes }),
      });
    } catch (err) {
      console.error("Couldn't update likes:", err);
    }
  }

  // Handle adding a new comment
  async function submitComment(text) {
    const newComment = {
      quoteId: currentQuote.id,
      text,
    };

    try {
      const response = await fetch(`${baseURL}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      const savedComment = await response.json();

      const li = document.createElement("li");
      li.textContent = savedComment.text;
      commentList.appendChild(li);
    } catch (err) {
      console.error("Couldn't add comment:", err);
    }
  }

  // Event listeners
  newQuoteBtn.addEventListener("click", loadQuote);
  likeBtn.addEventListener("click", likeQuote);
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const comment = commentInput.value.trim();
    if (comment) {
      submitComment(comment);
      commentInput.value = "";
    }
  });

  // Load a quote when page opens
  loadQuote();
});
