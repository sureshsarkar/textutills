import React, { useState } from "react";

const Textutils = () => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    const trimmedText = event.target.value.replace(/\s+/g, " ");
    setInput(trimmedText);
  };

  const handleUpperCase = () => setInput(input.toUpperCase());

  const handleLowerCase = () => setInput(input.toLowerCase());

  const handleSentenceCase = () => {
    const SentenceCaseText = input
      .split(" ")
      .map((word) =>
        word.length === 0 ? "" : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
    setInput(SentenceCaseText);
  };

  const handleSlug = () => {
    const slugText = input
      .replace(/[^\w\s]/g, "")
      .trim()
      .split(" ")
      .join("-")
      .toLowerCase();
    setInput(slugText);
  };

  const handleCopy = () => navigator.clipboard.writeText(input);

  const handleDownload = () => {
    const blob = new Blob([input], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "textutils.txt";
    link.click();
  };

  const handleListen = () => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(input);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    }
  };

  const handleReverseText = () => setInput(input.split("").reverse().join(""));

  const removeSpecialCharacters = () => {
    const newText = input.replace(/[^\w\s]/g, "");
    setInput(newText);
  };

  const wordCount = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
  const charCount = input.length;

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">

          <h2 className="text-center mb-4 text-primary">
            ✨ TextUtils – Smart Text Tool ✨ 
          </h2>

          <textarea
            className="form-control mb-4"
            rows="8"
            placeholder="Type or paste your text here..."
            value={input}
            onChange={handleChange}
          ></textarea>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">

            <button className="btn btn-primary" onClick={handleUpperCase} disabled={!input}>
              Upper Case
            </button>

            <button className="btn btn-primary" onClick={handleLowerCase} disabled={!input}>
              Lower Case
            </button>

            <button className="btn btn-primary" onClick={handleSentenceCase} disabled={!input}>
              Sentence Case
            </button>

            <button className="btn btn-secondary" onClick={handleSlug} disabled={!input}>
              Slug
            </button>

            <button className="btn btn-success" onClick={handleCopy} disabled={!input}>
              Copy
            </button>

            <button className="btn btn-success" onClick={handleDownload} disabled={!input}>
              Download
            </button>

            <button className="btn btn-warning" onClick={handleListen} disabled={!input}>
              Listen
            </button>

            <button className="btn btn-info" onClick={handleReverseText} disabled={!input}>
              Reverse
            </button>

            <button className="btn btn-danger" onClick={removeSpecialCharacters} disabled={!input}>
              Remove Special
            </button>

          </div>

          <div className="text-center text-muted">
            <p>
              <strong>Words:</strong> {wordCount} |{" "}
              <strong>Characters:</strong> {charCount}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Textutils;