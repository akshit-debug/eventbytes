import React, { useState } from 'react';
import { Heart, Share2, Play, Calendar, Users, Radio } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/event/${event.id}`)}
      className="group relative rounded-2xl overflow-hidden 
      bg-white/5 backdrop-blur-md border border-white/10 
      hover:-translate-y-2 hover:scale-[1.02]
      hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
      transition-all duration-500 flex flex-col h-full cursor-pointer"
    >

      {/* 🔥 Glow Border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
      transition duration-500 pointer-events-none 
      bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 blur-xl" />

      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-[#0b1220]">

        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-white/10 z-0" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-500 z-10" />

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-24 
        bg-gradient-to-t from-black/80 to-transparent z-10" />

        {/* Image */}
        <img
          src={event.image}
          alt={event.title}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1503428593586-e225b39bddfe";
          }}
          className={`w-full h-full object-cover 
          transition duration-700 
          group-hover:scale-110 group-hover:brightness-110
          ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex gap-2">
          {event.isLive ? (
            <span className="px-2.5 py-1 flex items-center gap-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-md">
              <Radio className="w-3 h-3 animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-black/60 border border-white/10 rounded-full text-xs text-white">
              Upcoming
            </span>
          )}

          <span className="px-2.5 py-1 bg-blue-600/80 text-white rounded-full text-xs">
            {event.category}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 
        opacity-0 group-hover:opacity-100 transition duration-300">

          {/* ❤️ LIKE */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 IMPORTANT
              setIsLiked(!isLiked);
            }}
            className={`p-2 rounded-full border transition ${isLiked
                ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]'
                : 'bg-black/40 border-white/10 text-white hover:bg-white/20'
              }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current scale-110' : ''}`} />
          </button>

          {/* 🔗 SHARE */}
          <button
            onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
            className="p-2 rounded-full bg-black/40 border border-white/10 text-white 
            hover:bg-white/20 hover:scale-110 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* ▶ PLAY ICON */}
        <div className="absolute inset-0 flex items-center justify-center 
        opacity-0 group-hover:opacity-100 transition pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center 
          shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] 
          transition">
            <Play className="w-5 h-5 text-white ml-1 fill-current" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-[#0b1220]/80">

        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1 
        group-hover:text-blue-300 group-hover:tracking-wide transition-all duration-300">
          {event.title}
        </h3>

        <p className="text-sm text-gray-400 mb-4">{event.organizer}</p>

        <div className="mt-auto space-y-3">

          <div className="flex justify-between text-sm text-gray-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" />
              {event.time}
            </div>

            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              {event.viewers}
            </div>
          </div>

          {/* Button still works */}
          <Link
            to={`/event/${event.id}`}
            onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
            className="block text-center py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
            text-white text-sm font-medium transition hover:scale-[1.02]"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
};

export default EventCard;