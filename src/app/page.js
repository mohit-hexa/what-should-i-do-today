"use client";
import { useState, useEffect, useRef } from "react";
import TimeSelector from "@/components/TimeSelector";
import SuggestionCard from "@/components/SuggestionCard";
import { suggestions } from "@/lib/suggestions";
import MoodSelector from "@/components/MoodeSelector";
import WeeklyPlan from "@/components/WeeklyPlan";
import { getAISuggestions } from "@/lib/getAISuggestions";
import FavoritesSection from "@/components/FavoritesSection";

export default function Home() {
  const [mood, setMood] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState([]);
  const [userPrefs, setUserPrefs] = useState({
    age: "18-25",
    interests: []
  });
  const [loading, setLoading] = useState(false);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const savedPrefs = localStorage.getItem("userPrefs");
    if (savedPrefs) {
      setUserPrefs(JSON.parse(savedPrefs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userPrefs", JSON.stringify(userPrefs));
  }, [userPrefs]);

  const handleGenerate = async () => {
    if (mood && time) {
      setLoading(true);
      try {
        const ideas = await getAISuggestions({
          mood,
          time,
          age: userPrefs.age,
          interests: userPrefs.interests
        });
        console.log(ideas, 'ideas');
        setResults(ideas);
        if (suggestionRef.current) {
          setTimeout(() => {
            suggestionRef.current.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const moodEmojiMap = {
    bored: "😴",
    stressed: "😓",
    creative: "🎨",
    motivated: "🔥",
    tired: "😪",
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e0f2fe] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800">
            What Should I Do Today? 🤔
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Get fun, meaningful, or relaxing ideas based on how you feel
          </p>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MoodSelector value={mood} onChange={setMood} />
          <TimeSelector value={time} onChange={setTime} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Age Group</label>
            <select
              value={userPrefs.age}
              onChange={(e) => setUserPrefs({ ...userPrefs, age: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            >
              <option value="13-17">13–17</option>
              <option value="18-25">18–25</option>
              <option value="26-35">26–35</option>
              <option value="36-50">36–50</option>
              <option value="50+">50+</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Interests</label>
            <input
              type="text"
              value={userPrefs.interests.join(", ")}
              onChange={(e) =>
                setUserPrefs({ ...userPrefs, interests: e.target.value.split(",").map(i => i.trim()) })
              }
              placeholder="e.g. fitness, music"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          {loading ? (
            <button
              disabled
              className="bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold text-lg cursor-not-allowed"
            >
              Loading...
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-gray-900 transition"
            >
              🎯 Show Me Ideas
            </button>
          )}
          <button
            onClick={() => {
              const moods = Object.keys(suggestions);
              const randomMood = moods[Math.floor(Math.random() * moods.length)];
              const times = Object.keys(suggestions[randomMood]);
              const randomTime = times[Math.floor(Math.random() * times.length)];
              const ideas = suggestions[randomMood][randomTime];
              const oneIdea = ideas[Math.floor(Math.random() * ideas.length)];
              setMood(randomMood);
              setTime(randomTime);
              setResults([oneIdea]);
            }}
            className="bg-white text-black border border-black px-6 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition"
          >
            🎲 Random Idea
          </button>
        </div>

        {/* Suggestions Output */}
        {results.length > 0 && (
          <div ref={suggestionRef} className="pt-6 space-y-3">
            <h2 className="text-xl font-semibold text-gray-700">
              Suggestions for {mood ? moodEmojiMap[mood] + " " + mood : ""} — {time}
            </h2>
            <div className="grid gap-4">
              {results.slice(0, 5).map((idea, idx) => (
                <SuggestionCard
                  key={idx}
                  text={idea}
                  mood={mood}
                  time={time}
                  age={userPrefs.age}
                  interests={userPrefs.interests}
                />
              ))}
            </div>
          </div>
        )}
        {/* Weekly Plan */}
        {/* <WeeklyPlan /> */}

        {/* Favorites Section */}
        <FavoritesSection />
      </div>
    </main>
  );
}