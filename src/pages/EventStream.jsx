import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import { events } from '../data/dummy';
import { Share2, Heart, Users, ChevronLeft, Calendar, User } from 'lucide-react';

const EventStream = () => {
  const { id } = useParams();
  const event = events.find(e => e.id === id) || events[0];

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#020617] text-white pb-10">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Browse
        </Link>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* VIDEO */}
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="Live Stream"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* INFO */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">

              <div className="flex flex-col md:flex-row justify-between gap-6">

                {/* LEFT TEXT */}
                <div>
                  <span className="inline-block mb-3 px-3 py-1 text-xs bg-blue-600/20 text-blue-400 rounded-full">
                    {event.category}
                  </span>

                  <h1 className="text-2xl md:text-3xl font-semibold mb-3 leading-tight">
                    {event.title}
                  </h1>

                  <div className="flex flex-wrap gap-5 text-sm text-gray-400">

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {event.organizer}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.time} | {event.date}
                    </div>

                    <div className="flex items-center gap-2 text-white font-medium">
                      <Users className="w-4 h-4" />
                      {event.viewers} watching
                    </div>

                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">

                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
                      ${liked
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'bg-white/5 border-white/10 hover:bg-red-500/10 hover:text-red-400'
                      }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    Like
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>

                </div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div>
                <h3 className="text-lg font-semibold mb-2">About this Event</h3>

                <p className="text-gray-300 mb-3 leading-relaxed">
                  Join this live session to explore the latest ideas, insights, and real-world strategies.
                  Learn from experts and engage with the community in real-time.
                </p>

                <p className="text-gray-400">
                  Use the chat to ask questions and interact with others during the stream.
                </p>
              </div>

            </div>
          </div>

          {/* 💬 CHAT (FIXED 🔥) */}
          <div className="lg:col-span-1">

            <div className="
              lg:sticky lg:top-24 
              h-[500px] sm:h-[550px] lg:h-[calc(100vh-120px)]
              bg-white/5 border border-white/10 
              rounded-xl backdrop-blur-md
              overflow-hidden flex flex-col
            ">

              <ChatBox />

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EventStream;