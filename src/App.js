import React, { useState, useEffect } from "react";
import "./App.css";

// Child Components
const QuoteText = ({ text }) => <div id="text">{text}</div>;

const Author = ({ author }) => <div id="author">- {author}</div>;

const Buttons = ({ getNewQuote, tweetQuote }) => (
  <div>
    <button id="new-quote" onClick={getNewQuote}>
      New Quote
    </button>
    <a
      href={tweetQuote}
      id="tweet-quote"
      target="_blank"
      rel="noopener noreferrer"
    >
      Tweet Quote
    </a>
  </div>
);

// Main Component
const QuoteBox = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("Unknown");

  const getNewQuote = async () => {
    try {
      // Fetching quotes from the Forismatic API
      const response = await fetch("https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en");
      const data = await response.json();
      setQuote(data.quoteText);
      setAuthor(data.quoteAuthor || "Unknown");
    } catch (error) {
      console.error("Error fetching the quote:", error);
    }
  };

  useEffect(() => {
    getNewQuote(); // Fetch a quote when the component mounts
  }, []);

  const tweetQuote = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)} - ${encodeURIComponent(author)}`;

  return (
    <div id="quote-box" className="quote-box">
      <QuoteText text={quote} />
      <Author author={author} />
      <Buttons getNewQuote={getNewQuote} tweetQuote={tweetQuote} />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <QuoteBox />
    </div>
  );
};

export default App;
