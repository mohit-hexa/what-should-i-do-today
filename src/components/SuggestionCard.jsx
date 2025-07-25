"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCopyIcon, HeartIcon, ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SuggestionCard({ text, tags = [], mood, time, age, interests }) {
  const [copied, setCopied] = useState(false);

  const [feedback, setFeedback] = useState(null); // 'like' | 'dislike' | null

  const [isFavorite, setIsFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favs.some((item) => item.text === text);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard", {
      description: text.length > 30 ? text.slice(0, 30) + "..." : text,
    });
    setTimeout(() => setCopied(false), 1500);
  };

  const handleToggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favs.find((item) => item.text === text);
    let updatedFavs;
    if (exists) {
      updatedFavs = favs.filter((item) => item.text !== text);
    } else {
      updatedFavs = [
        ...favs,
        {
          id: crypto.randomUUID(),
          text,
          mood,
          time,
          age,
          interests,
          tags
        }
      ];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    const allFeedback = JSON.parse(localStorage.getItem("aiFeedback") || "[]");
    allFeedback.push({
      id: crypto.randomUUID(),
      text,
      mood,
      time,
      age,
      interests,
      tags,
      feedback: type,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("aiFeedback", JSON.stringify(allFeedback));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white border shadow-sm hover:shadow-md transition duration-200 relative">
        <CardContent className="p-4 flex justify-between items-start text-sm text-gray-800">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <span className="mr-4">💡 {text}</span>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3 flex gap-2 items-center">
              <button
                onClick={() => handleFeedback("like")}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm border ${
                  feedback === "like" ? "bg-green-100 text-green-600 border-green-300" : "text-gray-500"
                }`}
              >
                <ThumbsUpIcon className="w-4 h-4" />
                Like
              </button>
              <button
                onClick={() => handleFeedback("dislike")}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm border ${
                  feedback === "dislike" ? "bg-red-100 text-red-600 border-red-300" : "text-gray-500"
                }`}
              >
                <ThumbsDownIcon className="w-4 h-4" />
                Dislike
              </button>
            </div>
          </div>
          <div className="flex items-start space-x-4 ml-4">
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-gray-700 transition"
              title="Copy to clipboard"
            >
              <ClipboardCopyIcon className="h-4 w-4" />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`transition ${
                isFavorite ? "text-red-500" : "text-gray-400 hover:text-gray-700"
              }`}
              title="Save to favorites"
            >
              <HeartIcon className="h-4 w-4 fill-current" />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Try this idea!",
                    text: text,
                    url: window.location.href,
                  });
                } else {
                  toast("Sharing is not supported in your browser.");
                }
              }}
              className="text-gray-400 hover:text-gray-700 transition"
              title="Share suggestion"
            >
              📤
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
