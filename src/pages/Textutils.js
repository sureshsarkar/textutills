import react, { useState } from "react";

const Textutils = () => {
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    const trimmedText = event.target.value.replace(/\s+/g, " ");
    setInput(trimmedText);
  };
  //   convert to upper case
  const handleUpperCase = () => {
    setInput(input.toUpperCase());
  };
  
  //   convert to lower case
  const handleLowerCase = () => {
    setInput(input.toLowerCase());
  };
  //   convert to Sentence case
  const handleSentenceCase = () => {
    const SentenceCaseText = input
      .split(" ")
      .map((word) => {
        if (word.length === 0) return "";
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    setInput(SentenceCaseText);
  };
  const handleSlug = () => {
    const slugText = input.trim().split(" ").join("-");
    setInput(slugText);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(input);
  };
  const handleDownload = () => {
    const blob = new Blob([input], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myFile.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
    const handleListen = () => {
         if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(input);
                speech.lang = 'en-US';
                speech.pitch = 1; // Pitch level (0 to 2)
                speech.rate = 1;  // Speed of speech (0.1 to 10)
                // Speak the text
                window.speechSynthesis.speak(speech);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech!");
        }
  };
    const handleReverseText = () => {
    const ReverseText = input.split("").reverse().join("");
    setInput(ReverseText);
  };
   const removeSpecialCharacters = () => {
    const newText = input.replace(/[^\w\s]/g, ""); // Remove all non-alphanumeric characters except whitespace
    setInput(newText);
  };
  return (
    <>
      <section>
        <div className="container mt-4">
          <h1 className="text-center">
            This is a textutill-: <b>App</b>
          </h1>
          <div className="form-floating">
            <textarea
              className="form-control"
              onChange={handleChange}
              placeholder="Leave a comment here"
              id="textarea"
              style={{ height: "100px" }}
              value={input}
            >
              {input}
            </textarea>
            {/* <p>{input}</p> */}
            <div className="m-2">
              <button className="btn btn-primary m-1" onClick={handleUpperCase} disabled={!input.trim()}>
                Upper Case
              </button>
              <button className="btn btn-primary m-1" onClick={handleLowerCase} disabled={!input.trim()}>
                Lower Case
              </button>
              <button
                className="btn btn-primary m-1"
                onClick={handleSentenceCase}
                  disabled={!input.trim()}>
                Sentence Case
              </button>
              <button className="btn btn-primary m-1" onClick={handleSlug} disabled={!input.trim()}>
                Slug
              </button>
              <button className="btn btn-primary m-1" onClick={handleCopy} disabled={!input.trim()}>
                Copy
              </button>
              <button className="btn btn-primary m-1" onClick={handleDownload} disabled={!input.trim()}>
                Download
              </button>
               <button className="btn btn-primary m-1" onClick={handleListen} disabled={!input.trim()}>
                Listen Now
              </button>
               <button className="btn btn-primary m-1" onClick={handleReverseText} disabled={!input.trim()}>
                Reverse Text
              </button>
               <button className="btn btn-primary m-1" onClick={removeSpecialCharacters} disabled={!input.trim()}>
                Remove Special Characters
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Textutils;
