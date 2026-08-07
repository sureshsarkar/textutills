import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menus = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Calculator",
      path: "/calculator",
    },
    {
      name: "Translator",
      path: "/translator",
    },
    {
      name: "Caption Studio",
      path: "/captionstudio",
    },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 flex items-center justify-center">
              <Sparkles size={20} />
            </div>

            <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Caption AI
            </span>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden md:flex items-center gap-2">

            {menus.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl transition-all duration-300

                ${
                  location.pathname === item.path
                    ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

          </nav>

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="md:hidden pb-5 flex flex-col gap-2">

            {menus.map((item) => (

              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl transition

                ${
                  location.pathname === item.path
                    ? "bg-fuchsia-500 text-white"
                    : "text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                {item.name}
              </Link>
            ))}

          </div>
        )}
      </div>
    </header>
  );
};

export default Header;