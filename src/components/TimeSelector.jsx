"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TimeSelector({ value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">Available Time</label>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full border-2 border-transparent hover:border-blue-400 transition rounded-md shadow-sm focus:ring-2 focus:ring-blue-200">
          <SelectValue placeholder="Select available time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5 min">5 mins ⏱</SelectItem>
          <SelectItem value="15 min">15 mins 🕒</SelectItem>
          <SelectItem value="30 min">30 mins 🕕</SelectItem>
          <SelectItem value="1 hour+">1 hour+ ⏳</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}