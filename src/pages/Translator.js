import { useState } from "react";
import { Volume2, Copy, ArrowRightLeft, Loader2, Languages as LangIcon } from "lucide-react";

// Minimal language list — replace/extend with your ../compoments/Languages.js
const languages = {
  "en-GB": "English",
  "hi-IN": "Hindi",
  "ur-PK": "Urdu",
  "ar-SA": "Arabic",
  "es-ES": "Spanish",
  "fr-FR": "French",
  "de-DE": "German",
  "zh-CN": "Chinese",
  "ja-JP": "Japanese",
  "ru-RU": "Russian",
  "pt-PT": "Portuguese",
  "bn-IN": "Bengali",
};

export default function Translator() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en-GB");
  const [toLanguage, setToLanguage] = useState("hi-IN");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1500);
  };

  const copyContent = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    flash("Text copied!");
  };

  const utterText = (text, language) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  };

  const handleExchange = () => {
    setFromText(toText);
    setToText(fromText);
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const handleTranslate = () => {
    if (!fromText.trim()) return;
    setLoading(true);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      fromText
    )}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        setLoading(false);
      })
      .catch(() => {
        flash("Translation failed. Try again.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-sky-400 mb-3">
            <LangIcon size={14} /> Translator
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Text Translator{" "}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              App
            </span>
          </h1>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl">
          {/* Text areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
              placeholder="Enter text"
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-100 text-sm outline-none resize-none focus:border-sky-500 transition placeholder:text-slate-600"
            />
            <textarea
              value={toText}
              readOnly
              placeholder="Translation"
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-100 text-sm outline-none resize-none placeholder:text-slate-600"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-4">
            {/* From */}
            <div className="flex-1 flex items-center justify-between gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
              <select
                value={fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value)}
                className="bg-transparent text-slate-200 text-sm outline-none flex-1"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code} className="bg-slate-900">
                    {name}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 text-slate-500">
                <button onClick={() => utterText(fromText, fromLanguage)} className="hover:text-sky-400 transition" title="Speak">
                  <Volume2 size={17} />
                </button>
                <button onClick={() => copyContent(fromText)} className="hover:text-sky-400 transition" title="Copy">
                  <Copy size={17} />
                </button>
              </div>
            </div>

            {/* Swap */}
            <button
              onClick={handleExchange}
              className="self-center bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl p-2.5 hover:opacity-90 transition shrink-0"
              title="Swap languages"
            >
              <ArrowRightLeft size={18} />
            </button>

            {/* To */}
            <div className="flex-1 flex items-center justify-between gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2 text-slate-500">
                <button onClick={() => copyContent(toText)} className="hover:text-sky-400 transition" title="Copy">
                  <Copy size={17} />
                </button>
                <button onClick={() => utterText(toText, toLanguage)} className="hover:text-sky-400 transition" title="Speak">
                  <Volume2 size={17} />
                </button>
              </div>
              <select
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
                className="bg-transparent text-slate-200 text-sm outline-none flex-1 text-right"
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code} className="bg-slate-900">
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Translate button */}
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full mt-5 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:opacity-90 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Translating…
              </>
            ) : (
              "Translate Text"
            )}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg border border-slate-700 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}