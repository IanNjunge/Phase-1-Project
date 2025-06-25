//DOM Elements
const quoteText=document.getElementById("quote-text");
const quoteAuthor=document.getElementById("quote-author");
const newQuoteBtn=document.getElementById("new-quote-button");
const likeBtn=document.getElementById("like-btn");
const likeCount=document.getElementById("like-count");
const commentForm=document.getElementById("comment-form");
const commentInput=document.getElementById("comment-input");
const commentsList=document.getElementById("comments-list");

//App State
let currentQuote ={};         //Currently displayed quote
let likes =0;                //Like count for current quote
let comments =[];             //Comments for current quote
let url =("https://zenquotes.io/api/random");


//Fetching resources(random quotes) using Zen Quotes API
function fetchQuote(){
fetch(url)
.then(response => response.json())
.then(data =>{
    const quote = data[0];           //extract object(quote)
    currentQuote = quote;
    likes =0;
    comments =[];
    
    renderQuote(quote);
    saveQuoteToServer(quote);
    console.log(successful);
})

//Incase fetch did not work
.catch(error => console.error("Failed to fetch quotes:", error));
}

//Display quote and reset likes and comments
function renderQuote(quote){
    quoteText.textContent =`"${quote.q}"`;
    quoteAuthor.textContent = `- ${quote.a}`;
    likeCount.textContent = likes;
    commentsList.innerHTML = ""; 
}


//Saving quote to json-server
function saveQuoteToServer(quote){
    fetch(`https://localhost:3000/quotes?q=${encodeURIComponent(quote.q)}`)
    .then(res => res.json())
    .then(existing =>{
        if (existing.length === 0)
    })
}

//Adding interactivity using eventListeners
likeBtn.addEventListener("click", () =>{
    likes++;
    likesCount.textContent = likes;
});

commentForm.addEventListener("click", () =>{
    else.preventDefault();
    const comment = commentInput.value.trim();
    if (comment){
        comments.push(comment);
        renderComments();
        commentInput.value ="";
    }
});



