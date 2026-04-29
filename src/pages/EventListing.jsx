import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { events, categories } from '../data/dummy';
import { Search } from 'lucide-react';

const EventListing = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 IMPROVED FILTER (smooth + safe)
  const filteredEvents = events.filter((event) => {
    const search = searchQuery.toLowerCase().trim();

    const matchesCategory =
      activeCategory === 'All' || event.category === activeCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(search) ||
      event.organizer.toLowerCase().includes(search) ||
      event.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#020617] text-white">

      {/* 🔥 NAVBAR WITH SEARCH */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />



      {/* 🔥 CATEGORY FILTERS */}
      <div className="max-w-7xl mx-auto px-4 mt-10 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition ${activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 🔍 SEARCH RESULT LABEL */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 mb-6 text-gray-400 text-sm">
          Showing results for:
          <span className="text-blue-400 ml-2 font-medium">
            "{searchQuery}"
          </span>
        </div>
      )}

      {/* 🔥 GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        {isLoading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="rounded-xl bg-white/5 border border-white/10 animate-pulse h-[320px]"
                />
              ))}
            </div>

            <p className="text-center text-gray-400 mt-6">
              Loading Events...
            </p>
          </>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">

            <Search className="w-10 h-10 text-gray-500 mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-2">
              No events match your search
            </h3>

            <p className="text-gray-400 mb-6">
              Try a different keyword or category.
            </p>

            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition hover:scale-105"
            >
              Clear Filters
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default EventListing;