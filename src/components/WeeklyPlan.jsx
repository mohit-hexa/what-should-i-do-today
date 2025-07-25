

"use client";
import { useEffect, useState } from "react";
// import suggestions from "@/data/suggestions";
import SuggestionCard from "./SuggestionCard";
import { suggestions } from "@/lib/suggestions";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function WeeklyPlan() {
  const [weekSuggestions, setWeekSuggestions] = useState([]);

  useEffect(() => {
    const moods = Object.keys(suggestions);
    const selected = [];

    while (selected.length < 7) {
      const mood = moods[Math.floor(Math.random() * moods.length)];
      const times = Object.keys(suggestions[mood]);
      const time = times[Math.floor(Math.random() * times.length)];
      const ideaList = suggestions[mood][time];
      const idea = ideaList[Math.floor(Math.random() * ideaList.length)];
      const entry = {
        mood,
        time,
        text: idea.text || idea,
        tags: idea.tags || [],
      };

      // Avoid duplicates
      if (!selected.find((s) => s.text === entry.text)) {
        selected.push(entry);
      }
    }

    setWeekSuggestions(selected);
  }, []);

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-semibold text-center">🗓️ Weekly Plan</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {weekSuggestions.map((item, idx) => (
          <SuggestionCard key={idx} text={`${weekdays[idx]}: ${item.text}`} tags={item.tags} />
        ))}
      </div>
    </div>
  );
}