"use client";

import { useState, useCallback } from "react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useVoiceSettings } from "@/lib/useVoiceSettings";
import { supabase } from "@/lib/supabase";
import { ReadModal } from "@/components/ReadModal";
import { scenarios, pickRandom, type Scenario } from "@/lib/data/scenarios";
import { pickRandomLesson, pickRandomPhrases, type Lesson, type Phrase } from "@/lib/data/phrases";
import { pickRandomVocab, type VocabWord } from "@/lib/data/vocabulary";

type Tab = "lesson" | "practice" | "vocabulary";

function getInitialPractice() { return pickRandom(scenarios, 5); }
function getInitialLesson(): { lesson: Lesson; phrases: Phrase[] } {
  const l = pickRandomLesson();
  return { lesson: l, phrases: pickRandomPhrases(l, 5) };
}
function getInitialVocab() { return pickRandomVocab(5); }

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<Tab>("practice");

  // Practice tab
  const [practiceItems, setPracticeItems] = useState<Scenario[]>(getInitialPractice);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showSuggested, setShowSuggested] = useState(false);

  // Lesson tab
  const [lessonData, setLessonData] = useState(getInitialLesson);

  // Vocabulary tab
  const [vocabItems, setVocabItems] = useState<VocabWord[]>(getInitialVocab);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [savingId, setSavingId] = useState<number | null>(null);

  const [readModal, setReadModal] = useState<{ text: string; label: string } | null>(null);
  const { speak, stop, isSpeaking, voices } = useSpeechSynthesis();
  const { rate, getVoice } = useVoiceSettings();

  function handleListen(text: string) {
    if (isSpeaking) { stop(); return; }
    const voice = getVoice(voices);
    speak(text, { voice, rate });
  }

  function refreshPractice() {
    setPracticeItems(pickRandom(scenarios, 5));
    setScenarioIndex(0);
    setShowSuggested(false);
  }

  function refreshLesson() {
    setLessonData(getInitialLesson());
  }

  function refreshVocab() {
    setVocabItems(pickRandomVocab(5));
    setSavedIds(new Set());
  }

  const saveVocabWord = useCallback(async (item: VocabWord) => {
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
  }, [savingId, savedIds]);

  const scenario = practiceItems[scenarioIndex];

  return (
    <div className="flex flex-col min-h-screen pt-16 pb-36">
      {readModal && (
        <ReadModal targetText={readModal.text} label={readModal.label} onClose={() => setReadModal(null)} />
      )}

      <div className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">

        {/* ── PRACTICE ── */}
        {activeTab === "practice" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">5 random scenarios</p>
              <button
                onClick={refreshPractice}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/10 transition-colors"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                Refresh
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {practiceItems.map((s, i) => (
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

            <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-[#1a2035] px-4 py-4 shadow-md">
              <p className="mb-2 text-sm font-semibold text-blue-400">Client:</p>
              <p className="text-sm text-slate-200 leading-relaxed mb-3">{scenario.clientMessage}</p>
              <button
                onClick={() => handleListen(scenario.clientMessage)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 hover:bg-white/10 transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
                {isSpeaking ? "Stop" : "Listen"}
              </button>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-[#1a1a10]/60 overflow-hidden">
              <button
                onClick={() => setShowSuggested(!showSuggested)}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-amber-300 hover:bg-white/5 transition-colors"
              >
                <span>💡</span>
                <span className="ml-1">Show suggested answer</span>
                <svg className={`ml-auto h-4 w-4 transition-transform ${showSuggested ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {showSuggested && (
                <div className="px-4 pb-4 border-t border-amber-500/10">
                  <p className="mt-3 text-sm text-slate-200 leading-relaxed">{scenario.suggestedAnswer}</p>
                  <button
                    onClick={() => handleListen(scenario.suggestedAnswer)}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
                    {isSpeaking ? "Stop" : "Listen to this"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── LESSON ── */}
        {activeTab === "lesson" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-green-500/10 border border-green-500/30 px-2.5 py-0.5 text-xs text-green-300 font-medium">{lessonData.lesson.level}</span>
                <h2 className="text-sm font-semibold text-slate-200">{lessonData.lesson.title}</h2>
              </div>
              <button
                onClick={refreshLesson}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                Refresh
              </button>
            </div>
            {lessonData.phrases.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-[#1a2035] px-4 py-3">
                <p className="text-sm font-semibold text-slate-100 mb-0.5">"{item.phrase}"</p>
                <p className="text-xs text-slate-500 mb-2">{item.usage}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleListen(item.phrase)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg> Listen
                  </button>
                  <button
                    onClick={() => setReadModal({ text: item.phrase, label: "Phrase" })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-500/20 transition-colors"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg> Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── VOCABULARY ── */}
        {activeTab === "vocabulary" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">5 random words</p>
              <button
                onClick={refreshVocab}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/10 transition-colors"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                Refresh
              </button>
            </div>
            {vocabItems.map((item) => (
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
                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleListen(`${item.word}. ${item.meaning}. Example: ${item.example}`)}
                      className="inline-flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg> Listen
                    </button>
                    <button
                      onClick={() => setReadModal({ text: item.word, label: item.word })}
                      className="inline-flex items-center justify-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1.5 text-[11px] text-purple-300 hover:bg-purple-500/20 transition-colors"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg> Read
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
