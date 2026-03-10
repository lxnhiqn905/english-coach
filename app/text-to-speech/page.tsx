"use client";

import { useState } from "react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { supabase } from "@/lib/supabase";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet.",
  "Good morning! Today is a wonderful day to practice your English speaking skills. Take your time and speak clearly.",
  "Learning a new language takes time and dedication. Practice a little every day, and you will see great improvement.",
];

export default function TextToSpeechPage() {
  const [text, setText] = useState("");
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const { isSpeaking, isPaused, voices, isSupported, currentWordIndex, speak, stop, pause, resume } =
    useSpeechSynthesis();

  // Track which word is being spoken
  const words = text.split(/\s+/).filter(Boolean);

  const handleSpeak = () => {
    if (!text.trim()) return;
    setStartTime(Date.now());
    speak(text, {
      voice: voices[selectedVoiceIndex] ?? null,
      rate,
      pitch,
      volume,
    });
  };

  const handleStop = () => {
    stop();
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  const handleSave = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setSaveMessage({ type: "error", text: "Nothing to save. Enter some text first." });
      return;
    }

    if (!supabase) {
      setSaveMessage({ type: "error", text: "Supabase is not configured. Add your credentials to .env.local." });
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    const durationSeconds = startTime ? Math.round((Date.now() - startTime) / 1000) : null;
    const wordCount = trimmed.split(/\s+/).filter(Boolean).length;

    try {
      const { error } = await supabase.from("practice_sessions").insert({
        type: "tts",
        content: trimmed,
        duration_seconds: durationSeconds,
        word_count: wordCount,
      });

      if (error) throw error;
      setSaveMessage({ type: "success", text: "Session saved successfully!" });
    } catch (err) {
      console.error("Save error:", err);
      setSaveMessage({ type: "error", text: "Failed to save session. Check your Supabase configuration." });
    } finally {
      setIsSaving(false);
    }
  };

  const loadSampleText = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setText(randomText);
  };

  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // Browser not supported
  if (!isSupported) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="max-w-lg text-center glass-card p-10">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-100">Browser Not Supported</h2>
          <p className="text-slate-400 mb-4">
            Text-to-speech requires a browser that supports the Web Speech API (Google Chrome recommended).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
          Listening Practice
        </div>
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Text to Speech</h1>
        <p className="text-slate-400">Type or paste text and listen to natural English pronunciation</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main content */}
        <div className="flex flex-col gap-5">
          {/* Text input area */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Your Text</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{wordCount} words · {text.length} chars</span>
                <button
                  onClick={loadSampleText}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Load Sample
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste English text here to hear it spoken aloud..."
              rows={6}
              className="w-full resize-none rounded-lg bg-[#0a0e1a] border border-purple-900/40 px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-purple-500/60 transition-colors"
            />
          </div>

          {/* Word-by-word highlighted display */}
          {text && isSpeaking && (
            <div className="glass-card p-5 animate-fade-in">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Reading Progress
              </h2>
              <div className="text-base leading-loose">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={`mr-1 rounded px-0.5 transition-all duration-100 ${
                      index === currentWordIndex
                        ? "bg-purple-500/40 text-purple-200 font-medium"
                        : index < currentWordIndex
                        ? "text-slate-500"
                        : "text-slate-300"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Save message */}
          {saveMessage && (
            <div className={`rounded-xl border p-4 animate-fade-in ${
              saveMessage.type === "success"
                ? "border-green-500/30 bg-green-500/10"
                : "border-red-500/30 bg-red-500/10"
            }`}>
              <p className={`text-sm ${saveMessage.type === "success" ? "text-green-300" : "text-red-300"}`}>
                {saveMessage.text}
              </p>
            </div>
          )}
        </div>

        {/* Side controls */}
        <div className="flex flex-col gap-4">
          {/* Playback controls */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Playback</h3>

            {/* Speaking indicator */}
            {isSpeaking && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/30 p-3">
                <div className="flex gap-0.5 items-end h-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-purple-400 rounded-full"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animation: `pulse ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                        minHeight: "4px",
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-purple-300 font-medium">
                  {isPaused ? "Paused" : "Speaking..."}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {/* Play/Stop button */}
              {!isSpeaking ? (
                <button
                  onClick={handleSpeak}
                  disabled={!text.trim()}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play
                </button>
              ) : (
                <>
                  <button
                    onClick={handlePauseResume}
                    className="w-full rounded-xl bg-yellow-500/20 border border-yellow-500/30 px-4 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isPaused ? (
                      <>
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Resume
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                        Pause
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleStop}
                    className="w-full rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 6h12v12H6z" />
                    </svg>
                    Stop
                  </button>
                </>
              )}

              {/* Save button */}
              <button
                onClick={handleSave}
                disabled={!text.trim() || isSaving}
                className="w-full rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Save Session
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Voice settings */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Voice Settings</h3>

            <div className="space-y-4">
              {/* Voice selector */}
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Voice</label>
                <select
                  value={selectedVoiceIndex}
                  onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                  disabled={isSpeaking}
                  className="w-full rounded-lg bg-[#0a0e1a] border border-purple-900/40 px-3 py-2 text-xs text-slate-200 disabled:opacity-50 focus:border-purple-500/60 transition-colors"
                >
                  {voices.length === 0 && (
                    <option value={0}>Loading voices...</option>
                  )}
                  {voices.map((voice, index) => (
                    <option key={index} value={index}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Rate slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs text-slate-400">Speed</label>
                  <span className="text-xs text-purple-300 font-mono">{rate.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  disabled={isSpeaking}
                  className="w-full disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Pitch slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs text-slate-400">Pitch</label>
                  <span className="text-xs text-purple-300 font-mono">{pitch.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(Number(e.target.value))}
                  disabled={isSpeaking}
                  className="w-full disabled:opacity-50"
                />
                <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                  <span>Low</span>
                  <span>Normal</span>
                  <span>High</span>
                </div>
              </div>

              {/* Volume slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs text-slate-400">Volume</label>
                  <span className="text-xs text-purple-300 font-mono">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tips</h3>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex gap-2"><span className="text-purple-400">•</span>Slow down to catch every word</li>
              <li className="flex gap-2"><span className="text-purple-400">•</span>Try different voices and accents</li>
              <li className="flex gap-2"><span className="text-purple-400">•</span>Shadow the voice as it speaks</li>
              <li className="flex gap-2"><span className="text-purple-400">•</span>Purple = current word being spoken</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
