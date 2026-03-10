"use client";

import { useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface ReadModalProps {
  targetText: string;
  label: string;
  onClose: () => void;
}

export function ReadModal({ targetText, label, onClose }: ReadModalProps) {
  const { isListening, transcript, interimTranscript, startListening, stopListening, resetTranscript, isSupported } =
    useSpeechRecognition();

  useEffect(() => {
    return () => { stopListening(); };
  }, [stopListening]);

  function handleClose() {
    stopListening();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-[#0f1629] border border-white/10 shadow-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-slate-300">Practice reading</p>
          <button onClick={handleClose} className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 min-h-[120px] flex flex-col">
            <p className="text-[10px] text-slate-500 mb-2 font-medium uppercase tracking-wide">{label}</p>
            <p className="text-sm text-slate-100 leading-relaxed flex-1">{targetText}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 min-h-[120px] flex flex-col">
            <p className="text-[10px] text-slate-500 mb-2 font-medium uppercase tracking-wide">Transcript</p>
            <div className="flex-1 text-sm leading-relaxed">
              {transcript ? (
                <span className="text-slate-100">{transcript}</span>
              ) : interimTranscript ? (
                <span className="text-slate-400 italic">{interimTranscript}</span>
              ) : (
                <span className="text-slate-600">Your speech here...</span>
              )}
            </div>
          </div>
        </div>

        {!isSupported ? (
          <p className="text-xs text-red-400 text-center py-2">Speech recognition not supported in this browser.</p>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={isListening ? stopListening : () => { resetTranscript(); startListening(); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border transition-all ${
                isListening
                  ? "bg-red-500/15 text-red-300 border-red-500/30"
                  : "bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25"
              }`}
            >
              {isListening ? "Stop" : "Start Recording"}
            </button>
            {transcript && (
              <button
                onClick={resetTranscript}
                className="px-4 py-3 rounded-xl text-xs text-slate-400 border border-white/10 hover:bg-white/5 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
