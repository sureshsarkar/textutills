import { useState } from "react";
import { Sparkles, Copy, Check, Loader2, Wand2 } from "lucide-react";

const STYLES = [
  { id: "aesthetic", label: "Aesthetic", hint: "soft, dreamy, poetic vibe" },
  { id: "bold", label: "Bold", hint: "confident, punchy, high-energy" },
  { id: "funny", label: "Funny", hint: "witty, playful, relatable" },
  { id: "minimal", label: "Minimal", hint: "clean, short, understated" },
  { id: "luxury", label: "Luxury", hint: "premium, elegant, exclusive" },
  { id: "hinglish", label: "Hinglish", hint: "casual desi Hindi-English mix" },
];

export default function CaptionStudio() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("aesthetic");
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState(null);

  const generate = async () => {
    if (!topic.trim()) {
      setError("Video ka topic ya thodi description likho.");
      return;
    }
    setError("");
    setLoading(true);
    setCaptions([]);

    const chosen = STYLES.find((s) => s.id === style);
    const prompt = `You are an expert Instagram caption writer.
Video topic/description: "${topic}"
Style: ${chosen.label} (${chosen.hint})

Write 5 scroll-stopping Instagram captions for a REEL/video in this exact style.
Rules:
- Each caption must be genuinely stylish and distinct from the others.
- Include a tasteful mix of emojis (not overdone).
- End each caption with 4-6 relevant, high-reach hashtags.
- Keep them ready to paste — no numbering inside the text.
- If style is Hinglish, write in natural Roman-Hindi + English mix.

Respond ONLY with a raw JSON array of 5 strings and nothing else. No markdown, no backticks.`;

    try {
       const res = await fetch("https://api.anthropic.com/v1/messages");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (!data.content) throw new Error("No content");
        const text = data.content.map((i) => (i.type === "text" ? i.text : "")).join("").replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error("Bad format");
        setCaptions(parsed);
    } catch (e) {
      setError("Kuch gadbad ho gaya. Dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-fuchsia-400 mb-3">
            <Sparkles size={14} /> Caption Studio
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Turn your reel into a{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              scroll-stopper
            </span>
          </h1>
          <p className="text-neutral-400 mt-3">
            Apni video ka topic likho, style chuno, aur ready-to-paste captions le lo.
          </p>
        </header>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-5">
          <div>
            <label className="text-sm text-neutral-300 mb-2 block">
              Video kis baare mein hai?
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              placeholder="e.g. Sunset beach walk in Goa, slow-mo waves, golden hour vibes"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-fuchsia-500 resize-none"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300 mb-2 block">Style</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm border transition ${
                    style === s.id
                      ? "bg-fuchsia-500 border-fuchsia-500 text-white"
                      : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:opacity-90 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Wand2 size={18} /> Generate captions
              </>
            )}
          </button>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <div className="mt-6 space-y-3">
          {captions.map((c, i) => (
            <div
              key={i}
              className="group bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex gap-3 items-start hover:border-neutral-700 transition"
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap flex-1">{c}</p>
              <button
                onClick={() => copy(c, i)}
                className="shrink-0 text-neutral-500 hover:text-fuchsia-400 transition"
                title="Copy"
              >
                {copiedIdx === i ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
