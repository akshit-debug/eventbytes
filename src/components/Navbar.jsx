import React, { useEffect, useState } from 'react';
import { Search, Bell, User } from 'lucide-react';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [scrolled, setScrolled] = useState(false);

  // 🔥 scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 
      ${scrolled
          ? "backdrop-blur-2xl bg-[#020617]/90 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          : "backdrop-blur-xl bg-[#020617]/70"
        } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">



          {/* 🔍 SEARCH (NOW WORKING 🔥) */}
          <div className="flex-1 max-w-xl mx-6 hidden md:block">
            <div className="relative group">

              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 
              group-focus-within:text-blue-400 transition" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, creators..."
                className="w-full pl-12 pr-4 py-3 rounded-full 
                bg-white/5 border border-white/10 
                text-white placeholder-gray-500 
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                focus:bg-white/10
                transition-all duration-300 backdrop-blur-sm
                glow-hover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* Mobile search */}
            <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition ripple">
              <Search className="w-5 h-5" />
            </button>

            {/* 🔔 Notification */}
            <button className="relative p-2 text-gray-400 hover:text-white 
            hover:bg-white/10 rounded-full transition ripple hover:scale-110">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* 👤 Profile */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 
            p-[2px] cursor-pointer hover:scale-110 transition duration-300">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center">
                <User className="w-5 h-5 text-gray-300" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;