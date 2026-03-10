"use client";

import { useState, useEffect } from "react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { supabase } from "@/lib/supabase";

type Tab = "lesson" | "practice" | "vocabulary";

interface VocabWord {
  id: number;
  word: string;
  pronunciation: string;
  vietnamese: string;
  meaning: string;
  example: string;
}

const scenarios = [
  {
    id: 1,
    title: "Post-mortem report",
    clientMessage:
      "Hi @Lee, following last week's outage, our management team is requesting a post-mortem report by Friday. Could you put together a summary of what happened, the root cause, and the steps we are taking to prevent it in the future?",
    suggestedAnswer:
      "Hi! Absolutely, I understand the urgency. I'll coordinate with our technical team to compile the incident details, root cause analysis, and our prevention plan. Just to confirm — do you need this in a specific format, or would a structured document covering timeline, impact, and action items work for your management?",
  },
  {
    id: 2,
    title: "Deadline slipped",
    clientMessage:
      "Hi, I noticed the delivery date for the new dashboard feature has slipped by two weeks. Can you explain what caused the delay and what the revised timeline looks like?",
    suggestedAnswer:
      "Hi, thanks for flagging this. The delay was caused by an unexpected complexity in integrating the third-party data source, which required additional testing cycles. We've adjusted our sprint plan and the revised delivery date is now March 28th. I'll send over an updated project plan by end of day — would that work for you?",
  },
  {
    id: 3,
    title: "Budget increase",
    clientMessage:
      "We received your revised proposal and noticed the budget has increased by 20% compared to the original estimate. Could you walk us through what's driving that increase?",
    suggestedAnswer:
      "Of course — thank you for bringing this up directly. The 20% increase is primarily driven by two factors: the expanded scope we agreed on in last month's review, which added three new integrations, and a rise in cloud infrastructure costs. I've prepared a detailed breakdown in the attached document. Happy to walk you through it on a call if that would be helpful.",
  },
];

const lesson = {
  title: "Handling difficult feedback professionally",
  level: "Intermediate",
  duration: "5 min",
  intro:
    "In a professional setting, receiving critical feedback gracefully is a valuable skill. These phrases help you acknowledge concerns without being defensive.",
  phrases: [
    { phrase: "Thank you for bringing this to my attention.", usage: "Acknowledge the feedback positively" },
    { phrase: "I understand your concern, and I take full responsibility.", usage: "Show accountability" },
    { phrase: "Let me look into this and get back to you with a clear plan.", usage: "Buy time while showing action" },
    { phrase: "Could you clarify what outcome you're expecting?", usage: "Clarify expectations" },
  ],
};

const vocabularyWords: VocabWord[] = [
  { id: 1, word: "Outage", pronunciation: "/ˈaʊtɪdʒ/", vietnamese: "Sự cố ngừng hoạt động", meaning: "A period when a service or system is unavailable", example: "The server outage lasted for three hours and affected all users." },
  { id: 2, word: "Root cause", pronunciation: "/ruːt kɔːz/", vietnamese: "Nguyên nhân gốc rễ", meaning: "The fundamental reason a problem occurred", example: "We identified the root cause as a misconfigured firewall rule." },
  { id: 3, word: "Mitigation", pronunciation: "/ˌmɪtɪˈɡeɪʃən/", vietnamese: "Biện pháp giảm thiểu", meaning: "Action taken to reduce the severity of a problem", example: "Our mitigation strategy includes daily backups and failover systems." },
  { id: 4, word: "Deliverable", pronunciation: "/dɪˈlɪvərəbəl/", vietnamese: "Kết quả bàn giao", meaning: "A concrete output or result expected from a project", example: "The main deliverable for this sprint is the new reporting dashboard." },
  { id: 5, word: "Scope creep", pronunciation: "/skəʊp kriːp/", vietnamese: "Phình phạm vi dự án", meaning: "Uncontrolled expansion of project requirements", example: "Scope creep was the main reason the project went over budget." },
];

// ── Read Modal ──────────────────────────────────────────────────────────────
function ReadModal({ targetText, label, onClose }: { targetText: string; label: string; onClose: () => void }) {
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
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-slate-300">Practice reading</p>
          <button onClick={handleClose} className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Two balanced areas */}
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

        {/* Controls */}
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

// ── Speaker icon ──────────────────────────────────────────────────────────
function SpeakerIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<Tab>("practice");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showSuggested, setShowSuggested] = useState(false);
  const [readModal, setReadModal] = useState<{ text: string; label: string } | null>(null);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [savingId, setSavingId] = useState<number | null>(null);

  const { speak, stop, isSpeaking } = useSpeechSynthesis();
  const scenario = scenarios[scenarioIndex];

  function handleListen(text: string) {
    if (isSpeaking) stop(); else speak(text);
  }

  async function saveVocabWord(item: VocabWord) {
    if (!supabase || savingId !== null || savedIds.has(item.id)) return;
    setSavingId(item.id);
    const { error } = await supabase.from("vocabulary").insert({
      user_id: "1",
      word: item.word,
      phonetic: item.pronunciation,
      vietnamese: item.vietnamese,
      usage: item.example,
    });
    setSavingId(null);
    if (!error) setSavedIds(prev => new Set(Array.from(prev).concat(item.id)));
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 pb-36">
      {readModal && (
        <ReadModal targetText={readModal.text} label={readModal.label} onClose={() => setReadModal(null)} />
      )}

      <div className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">

        {/* ── PRACTICE ── */}
        {activeTab === "practice" && (
          <div className="space-y-4">
            {/* Scenario selector */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {scenarios.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setScenarioIndex(i); setShowSuggested(false); }}
                  className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-medium border transition-all ${
                    i === scenarioIndex
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                      : "bg-white/5 text-slate-400 border-white/10 hover:border-purple-500/30"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Client message */}
            <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-[#1a2035] px-4 py-4 shadow-md">
              <p className="mb-2 text-sm font-semibold text-blue-400">Client:</p>
              <p className="text-sm text-slate-200 leading-relaxed">{scenario.clientMessage}</p>
            </div>

            {/* Suggested answer */}
            <div className="rounded-2xl border border-amber-500/20 bg-[#1a1a10]/60 overflow-hidden">
              <button
                onClick={() => setShowSuggested(!showSuggested)}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-amber-300 hover:bg-white/5 transition-colors"
              >
                <span>💡</span><span>💡</span>
                <span className="ml-1">Show suggested answer</span>
                <svg className={`ml-auto h-4 w-4 transition-transform ${showSuggested ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showSuggested && (
                <div className="px-4 pb-4 border-t border-amber-500/10">
                  <p className="mt-3 text-sm text-slate-200 leading-relaxed">{scenario.suggestedAnswer}</p>
                  <button
                    onClick={() => handleListen(scenario.suggestedAnswer)}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    <SpeakerIcon />
                    {isSpeaking ? "Stop" : "Listen to this"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── LESSON ── */}
        {activeTab === "lesson" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-xs text-green-300 font-medium">{lesson.level}</span>
              <span className="text-xs text-slate-500">{lesson.duration} read</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">{lesson.title}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{lesson.intro}</p>
            <div className="space-y-3">
              {lesson.phrases.map((item, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-[#1a2035] p-4">
                  <p className="text-sm font-semibold text-slate-100 mb-1">"{item.phrase}"</p>
                  <p className="text-xs text-slate-400 mb-3">{item.usage}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleListen(item.phrase)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      <SpeakerIcon /> Listen
                    </button>
                    <button
                      onClick={() => setReadModal({ text: item.phrase, label: "Phrase" })}
                      className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-500/20 transition-colors"
                    >
                      <MicIcon /> Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VOCABULARY ── */}
        {activeTab === "vocabulary" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-100 mb-4">New vocabulary</h2>
            {vocabularyWords.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-[#1a2035] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
                      <span className="text-base font-bold text-slate-100">{item.word}</span>
                      <span className="text-xs text-slate-500">{item.pronunciation}</span>
                    </div>
                    <p className="text-xs text-blue-300 mb-0.5">{item.vietnamese}</p>
                    <p className="text-xs text-purple-300 mb-1">{item.meaning}</p>
                    <p className="text-xs text-slate-400 italic">"{item.example}"</p>
                  </div>
                  {/* Action buttons column */}
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleListen(`${item.word}. ${item.meaning}. Example: ${item.example}`)}
                      className="inline-flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      <SpeakerIcon /> Listen
                    </button>
                    <button
                      onClick={() => setReadModal({ text: `${item.word}. ${item.example}`, label: item.word })}
                      className="inline-flex items-center justify-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1.5 text-[11px] text-purple-300 hover:bg-purple-500/20 transition-colors"
                    >
                      <MicIcon /> Read
                    </button>
                    <button
                      onClick={() => saveVocabWord(item)}
                      disabled={savedIds.has(item.id) || savingId === item.id}
                      className={`inline-flex items-center justify-center rounded-full border px-2.5 py-1.5 text-[11px] transition-colors ${
                        savedIds.has(item.id)
                          ? "border-green-500/30 bg-green-500/10 text-green-400 cursor-default"
                          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {savingId === item.id ? "..." : savedIds.has(item.id) ? "Saved ✓" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-purple-900/30 bg-[#0a0e1a]/95 backdrop-blur-md px-4 pb-6 pt-3">
        {activeTab === "practice" && (
          <button
            onClick={() => handleListen(scenario.clientMessage)}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm text-slate-300 hover:bg-white/10 transition-colors max-w-2xl mx-auto"
          >
            <SpeakerIcon />
            {isSpeaking ? "Stop" : "Listen"}
          </button>
        )}

        <div className="flex gap-2 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab("lesson")}
            className={`flex flex-1 items-center justify-center rounded-xl py-2.5 px-1 text-[11px] font-medium border text-center leading-tight transition-all ${
              activeTab === "lesson"
                ? "bg-green-500/15 text-green-300 border-green-500/30"
                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
            }`}
          >
            📚 Today&apos;s lesson
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`flex flex-1 items-center justify-center rounded-xl py-2.5 px-1 text-[11px] font-medium border text-center leading-tight transition-all ${
              activeTab === "practice"
                ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
            }`}
          >
            🤝 Practice with client
          </button>
          <button
            onClick={() => setActiveTab("vocabulary")}
            className={`flex flex-1 items-center justify-center rounded-xl py-2.5 px-1 text-[11px] font-medium border text-center leading-tight transition-all ${
              activeTab === "vocabulary"
                ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
            }`}
          >
            💬 New vocabulary
          </button>
        </div>
      </div>
    </div>
  );
}
