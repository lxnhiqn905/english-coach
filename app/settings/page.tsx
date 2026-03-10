"use client";

import { useEffect, useState } from "react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useVoiceSettings } from "@/lib/useVoiceSettings";

export default function SettingsPage() {
  const { voices, speak, stop, isSpeaking } = useSpeechSynthesis();
  const { voiceURI, rate, setVoiceURI, setRate, getVoice } = useVoiceSettings();
  const [previewText] = useState("The quick brown fox jumps over the lazy dog.");

  // Ensure voices are loaded before rendering the selector
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (voices.length > 0) setReady(true);
  }, [voices]);

  function handlePreview() {
    if (isSpeaking) { stop(); return; }
    const voice = getVoice(voices);
    speak(previewText, { voice, rate });
  }

  const selectedVoice = getVoice(voices);

  return (
    <div className="min-h-screen pt-16 pb-8 px-4">
      <div className="max-w-lg mx-auto py-6 space-y-6">
        <h1 className="text-xl font-bold text-slate-100">Settings</h1>

        {/* Voice selector */}
        <div className="rounded-2xl border border-white/10 bg-[#1a2035] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-300">Voice</h2>

          {!ready ? (
            <p className="text-xs text-slate-500">Loading voices…</p>
          ) : voices.length === 0 ? (
            <p className="text-xs text-red-400">No voices found. Speech synthesis may not be supported in this browser.</p>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => setVoiceURI(null)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  voiceURI === null
                    ? "bg-purple-500/20 border-purple-500/40 text-purple-200"
                    : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <span className="font-medium">System default</span>
                <span className="ml-2 text-xs text-slate-500">Let the browser choose</span>
              </button>
              {voices.map((v) => (
                <button
                  key={v.voiceURI}
                  onClick={() => setVoiceURI(v.voiceURI)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    voiceURI === v.voiceURI
                      ? "bg-purple-500/20 border-purple-500/40 text-purple-200"
                      : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  <span className="font-medium">{v.name}</span>
                  <span className="ml-2 text-xs text-slate-500">{v.lang}</span>
                  {v.localService && <span className="ml-2 text-[10px] text-green-400 border border-green-500/30 rounded-full px-1.5 py-0.5">local</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Speed selector */}
        <div className="rounded-2xl border border-white/10 bg-[#1a2035] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-300">Speed</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Slower</span>
              <span className="text-sm font-bold text-purple-300">{rate.toFixed(1)}×</span>
              <span className="text-xs text-slate-500">Faster</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex gap-2 flex-wrap">
              {[0.7, 0.85, 1.0, 1.25, 1.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`rounded-full px-3 py-1 text-xs border transition-all ${
                    Math.abs(rate - r) < 0.05
                      ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                      : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  {r === 1.0 ? "Normal" : `${r}×`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-white/10 bg-[#1a2035] p-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-300">Preview</h2>
          <p className="text-xs text-slate-400 italic">"{previewText}"</p>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePreview}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                isSpeaking
                  ? "bg-red-500/15 border-red-500/30 text-red-300"
                  : "bg-purple-500/15 border-purple-500/30 text-purple-300 hover:bg-purple-500/25"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              {isSpeaking ? "Stop" : "Play preview"}
            </button>
            <div className="text-xs text-slate-500">
              {selectedVoice ? selectedVoice.name : "System default"} · {rate.toFixed(1)}×
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
