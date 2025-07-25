import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const moods = [
  { label: "Bored 💤", value: "bored" },
  { label: "Creative 🎨", value: "creative" },
  { label: "Motivated 💪", value: "motivated" },
  { label: "Lazy 🛋️", value: "lazy" },
];

const times = [
  { label: "5 min ⏱", value: "5 min" },
  { label: "15 min 🕒", value: "15 min" },
  { label: "30 min 🕕", value: "30 min" },
  { label: "1 hr+ ⏳", value: "1 hour+" },
];

export default function JourneyMode({ onComplete }) {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(1, s - 1));

  const fetchIdea = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/journey-ai", {
        method: "POST",
        body: JSON.stringify({ mood, time }),
      });
      const data = await res.json();
      setSuggestion(data?.suggestion || "Try again later!");
    } catch (err) {
      setSuggestion("Something went wrong. Try again!");
    } finally {
      setLoading(false);
      next();
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg max-w-xl mx-auto shadow-lg min-h-[300px]">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-center">🤔 What’s your mood?</h2>
            <div className="grid grid-cols-2 gap-4">
              {moods.map((m) => (
                <Button
                  key={m.value}
                  variant={mood === m.value ? "default" : "outline"}
                  onClick={() => setMood(m.value)}
                >
                  {m.label}
                </Button>
              ))}
            </div>
            <div className="text-center">
              <Button onClick={next} disabled={!mood}>
                Next →
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-center">⏱ How much time?</h2>
            <div className="grid grid-cols-2 gap-4">
              {times.map((t) => (
                <Button
                  key={t.value}
                  variant={time === t.value ? "default" : "outline"}
                  onClick={() => setTime(t.value)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={back}>
                ← Back
              </Button>
              <Button onClick={fetchIdea} disabled={!time || loading}>
                {loading ? "Loading..." : "Show Idea →"}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 text-center"
          >
            <h2 className="text-2xl font-semibold">🎉 Your Idea</h2>
            <p className="text-lg">{suggestion}</p>
            <Button variant="outline" onClick={() => setStep(1)}>
              Start Over 🔄
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
