import React, { useState } from "react";
import {
  Type,
  Copy,
  Download,
  Volume2,
  RotateCcw,
  Eraser,
  ArrowUp,
  ArrowDown,
  CaseSensitive,
  Link2,
} from "lucide-react";


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
    <div className="min-h-screen bg-neutral-950 text-white py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl"> 
            <div className="text-center mb-2"> 
              <h1 className="text-5xl font-bold">  
                <span className="block bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                 Textutils App
                </span> 
              </h1> 
              <p className="text-neutral-400 mt-2 max-w-2xl mx-auto">

                Convert, format, clean, copy and analyze your text instantly using our smart tools.

              </p>

            </div>

            <textarea
              rows={10}
              value={input}
              onChange={handleChange}
              placeholder="Start typing or paste your text here..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">

              <button
                onClick={handleUpperCase}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 disabled:opacity-40 py-3 font-semibold transition">

                <ArrowUp size={18} />
                Upper

              </button>

              <button
                onClick={handleLowerCase}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-40 py-3">

                <ArrowDown size={18} />
                Lower

              </button>

              <button
                onClick={handleSentenceCase}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-500 hover:bg-purple-600 disabled:opacity-40 py-3">

                <CaseSensitive size={18} />
                Sentence

              </button>

              <button
                onClick={handleSlug}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 py-3">

                <Link2 size={18} />
                Slug

              </button>

              <button
                onClick={handleCopy}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-40 py-3">

                <Copy size={18} />
                Copy

              </button>

              <button
                onClick={handleDownload}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 py-3">

                <Download size={18} />
                Download

              </button>

              <button
                onClick={handleListen}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-40 py-3">

                <Volume2 size={18} />
                Listen

              </button>

              <button
                onClick={handleReverseText}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:opacity-40 py-3">

                <RotateCcw size={18} />
                Reverse

              </button>

              <button
                onClick={removeSpecialCharacters}
                disabled={!input}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-40 py-3">

                <Eraser size={18} />
                Clean

              </button>

            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-5">

              <div className="bg-neutral-800 rounded-2xl p-6 text-center">

                <p className="text-neutral-400">

                  Words

                </p>

                <h2 className="text-4xl font-bold text-fuchsia-400">

                  {wordCount}

                </h2>

              </div>

              <div className="bg-neutral-800 rounded-2xl p-6 text-center">

                <p className="text-neutral-400">

                  Characters

                </p>

                <h2 className="text-4xl font-bold text-pink-400">

                  {charCount}

                </h2>

              </div>

            </div>
 
        </div>
      </div>
    </div>
  );
};

export default Textutils;