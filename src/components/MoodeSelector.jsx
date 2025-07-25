

"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function MoodSelector({ value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Your Mood</label>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full border-2 border-transparent bg-white bg-clip-padding hover:border-blue-400 transition rounded-md shadow-sm focus:ring-2 focus:ring-blue-200
        border-gradient-to-r from-blue-400 via-purple-400 to-pink-400
        ">
          <SelectValue placeholder="Select your mood" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bored">Bored 💤</SelectItem>
          <SelectItem value="stressed">Stressed 😓</SelectItem>
          <SelectItem value="creative">Creative 🎨</SelectItem>
          <SelectItem value="motivated">Motivated 💪</SelectItem>
          <SelectItem value="adventurous">Adventurous 🧭</SelectItem>
          <SelectItem value="chill">Chill 😎</SelectItem>
          <SelectItem value="romantic">Romantic 💖</SelectItem>
          <SelectItem value="curious">Curious 🧠</SelectItem>
          <SelectItem value="lazy">Lazy 🛋️</SelectItem>
          <SelectItem value="productive">Productive 📈</SelectItem>
          <SelectItem value="playful">Playful 🎲</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}