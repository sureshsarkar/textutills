import { useState } from "react";
import { Delete } from "lucide-react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  // Safe evaluator — no eval(). Handles + - * / . and parentheses.
  const safeEval = (expr) => {
    if (!/^[0-9+\-*/.() ]+$/.test(expr)) throw new Error("bad");
    // eslint-disable-next-line no-new-func
    const val = Function(`"use strict"; return (${expr})`)();
    if (val === undefined || Number.isNaN(val) || !Number.isFinite(val))
      throw new Error("bad");
    return val;
  };

  const calculatePercentage = (expression) => {
    const [a, b] = expression.split("%");
    return (parseFloat(a) / 100) * parseFloat(b);
  };

  const handleClick = (value) => {
    if (value === "=") {
      try {
        if (input.includes("%")) {
          const r = calculatePercentage(input);
          setResult(r);
          setInput(r.toString());
        } else {
          const r = safeEval(input);
          setResult(r);
          setInput(r.toString());
        }
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput(input + value);
    }
  };

  const handleSquare = () => {
    const n = parseFloat(input);
    if (!Number.isNaN(n)) setResult(n * n);
  };

  const handleRemove = () => setInput(input.slice(0, -1));

  const base =
    "h-14 rounded-2xl text-lg font-medium transition active:scale-95 select-none";
  const num = `${base} bg-slate-800 text-slate-100 hover:bg-slate-700`;
  const op = `${base} bg-slate-700 text-sky-300 hover:bg-slate-600`;
  const special = `${base} bg-slate-800/60 text-amber-300 hover:bg-slate-700 text-base`;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xs">
        <h2 className="text-center mb-5 text-2xl font-bold text-white tracking-tight">
          🧮 Smart{" "}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Calculator
          </span>
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl">
          {/* Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-5 mb-4 text-right overflow-hidden">
            <div className="text-slate-400 text-sm truncate min-h-[20px]">
              {input || "0"}
            </div>
            <div className="text-white text-3xl font-semibold truncate min-h-[40px]">
              {result !== "" ? result : ""}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2.5">
            <button className={num} onClick={() => handleClick("7")}>7</button>
            <button className={num} onClick={() => handleClick("8")}>8</button>
            <button className={num} onClick={() => handleClick("9")}>9</button>
            <button className={op} onClick={() => handleClick("/")}>÷</button>

            <button className={num} onClick={() => handleClick("4")}>4</button>
            <button className={num} onClick={() => handleClick("5")}>5</button>
            <button className={num} onClick={() => handleClick("6")}>6</button>
            <button className={op} onClick={() => handleClick("*")}>×</button>

            <button className={num} onClick={() => handleClick("1")}>1</button>
            <button className={num} onClick={() => handleClick("2")}>2</button>
            <button className={num} onClick={() => handleClick("3")}>3</button>
            <button className={op} onClick={() => handleClick("-")}>−</button>

            <button className={num} onClick={() => handleClick("0")}>0</button>
            <button className={num} onClick={() => handleClick(".")}>.</button>
            <button
              className={`${base} bg-rose-500/90 text-white hover:bg-rose-500`}
              onClick={() => handleClick("C")}
            >
              C
            </button>
            <button className={op} onClick={() => handleClick("+")}>+</button>

            <button className={special} onClick={() => handleClick("%")}>%</button>
            <button className={special} onClick={handleSquare}>x²</button>
            <button
              className={`${special} flex items-center justify-center`}
              onClick={handleRemove}
            >
              <Delete size={18} />
            </button>
            <button
              className={`${base} bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:opacity-90`}
              onClick={() => handleClick("=")}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}