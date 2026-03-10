"use client";

import { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import MicrophoneButton from "@/components/MicrophoneButton";
import { supabase } from "@/lib/supabase";

const LANGUAGES = [
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "en-AU", label: "English (AU)" },
  { code: "en-IN", label: "English (India)" },
];

export default function SpeechToTextPage() {
  const [language, setLanguage] = useState("en-US");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const { isListening, transcript, interimTranscript, isSupported, error, startListening, stopListening, resetTranscript } =
    useSpeechRecognition({ language });

  // Auto-scroll to bottom
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, interimTranscript]);

  // Track session start time
  useEffect(() => {
    if (isListening && !startTime) {
      setStartTime(Date.now());
    }
  }, [isListening, startTime]);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      setStartTime(Date.now());
      startListening();
    }
  };

  const handleClear = () => {
    stopListening();
    resetTranscript();
    setStartTime(null);
    setSaveMessage(null);
  };

  const handleSave = async () => {
    const fullText = transcript.trim();
    if (!fullText) {
      setSaveMessage({ type: "error", text: "Nothing to save. Record some speech first." });
      return;
    }

    if (!supabase) {
      setSaveMessage({ type: "error", text: "Supabase is not configured. Add your credentials to .env.local." });
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    const durationSeconds = startTime ? Math.round((Date.now() - startTime) / 1000) : null;
    const wordCount = fullText.split(/\s+/).filter(Boolean).length;

    try {
      const { error: dbError } = await supabase.from("practice_sessions").insert({
        type: "stt",
        content: fullText,
        duration_seconds: durationSeconds,
        word_count: wordCount,
      });

      if (dbError) throw dbError;

      setSaveMessage({ type: "success", text: "Session saved successfully!" });
    } catch (err) {
      console.error("Save error:", err);
      setSaveMessage({ type: "error", text: "Failed to save session. Check your Supabase configuration." });
    } finally {
      setIsSaving(false);
    }
  };

  const wordCount = transcript.split(/\s+/).filter(Boolean).length;
  const charCount = transcript.length;
  const fullTranscript = transcript + (interimTranscript ? interimTranscript : "");

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
            Speech recognition requires Google Chrome or a Chromium-based browser (Edge, Brave, etc.).
          </p>
          <p className="text-sm text-slate-500">
            Please open this page in Chrome to use the speech-to-text feature.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-300">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
          Speaking Practice
        </div>
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Speech to Text</h1>
        <p className="text-slate-400">Speak clearly and see your words transcribed in real time</p>
      </div>

      {/* Controls Row */}
      <div className="glass-card p-5 mb-6 flex flex-col sm:flex-row gap-4 items-center">
        {/* Language selector */}
        <div className="flex-1 min-w-0">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Language / Accent</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={isListening}
            className="w-full rounded-lg bg-[#0a0e1a] border border-purple-900/40 px-3 py-2.5 text-sm text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-500/60 transition-colors"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-100">{wordCount}</div>
            <div className="text-xs text-slate-500">words</div>
          </div>
          <div className="w-px bg-purple-900/40" />
          <div>
            <div className="text-2xl font-bold text-slate-100">{charCount}</div>
            <div className="text-xs text-slate-500">chars</div>
          </div>
          <div className="w-px bg-purple-900/40" />
          <div>
            <div className={`text-2xl font-bold ${isListening ? "text-red-400" : "text-slate-100"}`}>
              {isListening ? "REC" : "IDLE"}
            </div>
            <div className="text-xs text-slate-500">status</div>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Transcript area */}
        <div className="glass-card p-6 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Transcript</h2>
            {(transcript || interimTranscript) && (
              <span className="text-xs text-slate-500">{wordCount} words · {charCount} characters</span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto text-base leading-relaxed min-h-[300px]">
            {!transcript && !interimTranscript && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="mb-4 text-4xl opacity-20">🎤</div>
                <p className="text-slate-500 text-sm">
                  {isListening
                    ? "Listening... start speaking"
                    : "Press the microphone button to start"}
                </p>
              </div>
            )}

            {transcript && (
              <span className="text-slate-200">{transcript}</span>
            )}
            {interimTranscript && (
              <span className="text-slate-500 italic">{interimTranscript}</span>
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-4">
          {/* Microphone button */}
          <div className="glass-card p-6 flex flex-col items-center gap-4">
            <MicrophoneButton
              isListening={isListening}
              onClick={handleToggleListening}
              size="lg"
            />
            <div className="text-center">
              <div className={`text-sm font-semibold ${isListening ? "text-red-400" : "text-slate-300"}`}>
                {isListening ? "Recording..." : "Click to Record"}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {isListening ? "Click again to stop" : "Speak clearly in English"}
              </div>
            </div>

            {/* Live indicator */}
            {isListening && (
              <div className="flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/30 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs text-red-300 font-medium">LIVE</span>
              </div>
            )}
          </div>

          {/* Error display */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Save message */}
          {saveMessage && (
            <div className={`rounded-xl border p-4 ${
              saveMessage.type === "success"
                ? "border-green-500/30 bg-green-500/10"
                : "border-red-500/30 bg-red-500/10"
            }`}>
              <p className={`text-sm ${saveMessage.type === "success" ? "text-green-300" : "text-red-300"}`}>
                {saveMessage.text}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSave}
              disabled={!transcript.trim() || isSaving}
              className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Save Session
                </span>
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={!transcript && !interimTranscript}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-700/50 hover:border-slate-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Clear
              </span>
            </button>
          </div>

          {/* Tips */}
          <div className="glass-card p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tips</h3>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex gap-2"><span className="text-green-400">•</span>Speak clearly and at a natural pace</li>
              <li className="flex gap-2"><span className="text-green-400">•</span>Minimize background noise</li>
              <li className="flex gap-2"><span className="text-green-400">•</span>Gray text shows what you're saying live</li>
              <li className="flex gap-2"><span className="text-green-400">•</span>Save sessions to track your progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
