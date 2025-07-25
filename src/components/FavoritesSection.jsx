"use client";
import { useEffect, useState } from "react";
import SuggestionCard from "./SuggestionCard";

export default function FavoritesSection() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  if (favorites.length === 0) return null;

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-semibold text-center">❤️ Your Favorite Ideas</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {favorites.map((fav) => (
          <SuggestionCard
            key={fav.id}
            text={fav.text}
            mood={fav.mood}
            time={fav.time}
            age={fav.age}
            interests={fav.interests}
            tags={fav.tags}
          />
        ))}
      </div>
    </div>
  );
}
