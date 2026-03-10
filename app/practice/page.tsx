"use client";

import { useState } from "react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

type Tab = "lesson" | "practice" | "vocabulary";

const scenarios = [
  {
    id: 1,
    title: "Post-mortem report request",
    prompt:
      'Let\'s do a roleplay. The scenario is: Post-mortem report request. Start by sending me this exact client message, then continue the roleplay naturally: "Hi @Lee, following last week\'s outage, our management team is requesting a post-mortem report by Friday. Could you put together a summary of what happened, the root cause, and the steps we are taking to prevent it in the future?"',
    clientMessage:
      "Hi @Lee, following last week's outage, our management team is requesting a post-mortem report by Friday. Could you put together a summary of what happened, the root cause, and the steps we are taking to prevent it in the future?",
    suggestedAnswer:
      "Hi! Absolutely, I understand the urgency. I'll coordinate with our technical team to compile the incident details, root cause analysis, and our prevention plan. Just to confirm — do you need this in a specific format, or would a structured document covering timeline, impact, and action items work for your management?",
  },
  {
    id: 2,
    title: "Project deadline extension",
    prompt:
      'Roleplay scenario: Your client is asking about a project delay. Client message: "Hi, I noticed the delivery date for the new dashboard feature has slipped by two weeks. Can you explain what caused the delay and what the revised timeline looks like?"',
    clientMessage:
      "Hi, I noticed the delivery date for the new dashboard feature has slipped by two weeks. Can you explain what caused the delay and what the revised timeline looks like?",
    suggestedAnswer:
      "Hi, thanks for flagging this. The delay was caused by an unexpected complexity in integrating the third-party data source, which required additional testing cycles. We've adjusted our sprint plan and the revised delivery date is now March 28th. I'll send over an updated project plan by end of day — would that work for you?",
  },
  {
    id: 3,
    title: "Budget approval request",
    prompt:
      'Roleplay scenario: A client is questioning a budget increase. Client message: "We received your revised proposal and noticed the budget has increased by 20% compared to the original estimate. Could you walk us through what's driving that increase?"',
    clientMessage:
      "We received your revised proposal and noticed the budget has increased by 20% compared to the original estimate. Could you walk us through what's driving that increase?",
    suggestedAnswer:
      "Of course — thank you for bringing this up directly. The 20% increase is primarily driven by two factors: the expanded scope we agreed on in last month's review, which added three new integrations, and a rise in cloud infrastructure costs. I've prepared a detailed breakdown in the attached document. Happy to walk you through it on a call if that would be helpful.",
  },
];

const lessons = [
  {
    id: 1,
    title: "Handling difficult feedback professionally",
    level: "Intermediate",
    duration: "5 min",
    intro:
      "In a professional setting, receiving critical feedback gracefully is a valuable skill. These phrases help you acknowledge concerns without being defensive.",
    phrases: [
      {
        phrase: "Thank you for bringing this to my attention.",
        usage: "Acknowledge the feedback positively",
      },
      {
        phrase: "I understand your concern, and I take full responsibility.",
        usage: "Show accountability",
      },
      {
        phrase: "Let me look into this and get back to you with a clear plan.",
        usage: "Buy time while showing action",
      },
      {
        phrase: "Could you clarify what outcome you're expecting?",
        usage: "Clarify expectations",
      },
    ],
  },
];

const vocabularyWords = [
  {
    word: "Outage",
    pronunciation: "/ˈaʊtɪdʒ/",
    meaning: "A period when a service or system is unavailable",
    example: "The server outage lasted for three hours and affected all users.",
  },
  {
    word: "Root cause",
    pronunciation: "/ruːt kɔːz/",
    meaning: "The fundamental reason a problem occurred",
    example: "We identified the root cause as a misconfigured firewall rule.",
  },
  {
    word: "Mitigation",
    pronunciation: "/ˌmɪtɪˈɡeɪʃən/",
    meaning: "Action taken to reduce the severity of a problem",
    example: "Our mitigation strategy includes daily backups and failover systems.",
  },
  {
    word: "Deliverable",
    pronunciation: "/dɪˈlɪvərəbəl/",
    meaning: "A concrete output or result expected from a project",
    example: "The main deliverable for this sprint is the new reporting dashboard.",
  },
  {
    word: "Scope creep",
    pronunciation: "/skəʊp kriːp/",
    meaning: "Uncontrolled expansion of project requirements",
    example: "Scope creep was the main reason the project went over budget.",
  },
];

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<Tab>("practice");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showSuggested, setShowSuggested] = useState(false);
  const { speak, stop, isSpeaking } = useSpeechSynthesis();

  const scenario = scenarios[scenarioIndex];
  const lesson = lessons[0];

  function handleListen(text: string) {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-16 pb-36">
      {/* Scrollable content */}
      <div className="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">

        {/* ── PRACTICE TAB ── */}
        {activeTab === "practice" && (
          <div className="space-y-4">
            {/* Scenario selector */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
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

            {/* User prompt bubble */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-3 text-sm text-white leading-relaxed shadow-lg">
                {scenario.prompt}
              </div>
            </div>

            {/* Client message card */}
            <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-[#1a2035] px-4 py-4 shadow-md">
              <p className="mb-2 text-sm font-semibold text-blue-400">Client:</p>
              <p className="text-sm text-slate-200 leading-relaxed">{scenario.clientMessage}</p>
            </div>

            {/* Suggested answer (collapsible) */}
            <div className="rounded-2xl border border-amber-500/20 bg-[#1a1a10]/60 overflow-hidden">
              <button
                onClick={() => setShowSuggested(!showSuggested)}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-amber-300 hover:bg-white/5 transition-colors"
              >
                <span>💡</span>
                <span>💡</span>
                <span className="ml-1">Show suggested answer</span>
                <svg
                  className={`ml-auto h-4 w-4 transition-transform ${showSuggested ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showSuggested && (
                <div className="px-4 pb-4 border-t border-amber-500/10">
                  <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                    {scenario.suggestedAnswer}
                  </p>
                  <button
                    onClick={() => handleListen(scenario.suggestedAnswer)}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                    {isSpeaking ? "Stop" : "Listen to this"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── LESSON TAB ── */}
        {activeTab === "lesson" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-xs text-green-300 font-medium">
                {lesson.level}
              </span>
              <span className="text-xs text-slate-500">{lesson.duration} read</span>
            </div>

            <h2 className="text-xl font-bold text-slate-100">{lesson.title}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{lesson.intro}</p>

            <div className="space-y-3 mt-4">
              {lesson.phrases.map((item, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-[#1a2035] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-100 mb-1">"{item.phrase}"</p>
                      <p className="text-xs text-slate-400">{item.usage}</p>
                    </div>
                    <button
                      onClick={() => handleListen(item.phrase)}
                      className="flex-shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VOCABULARY TAB ── */}
        {activeTab === "vocabulary" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-100 mb-4">New vocabulary</h2>
            {vocabularyWords.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-[#1a2035] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-base font-bold text-slate-100">{item.word}</span>
                      <span className="text-xs text-slate-500">{item.pronunciation}</span>
                    </div>
                    <p className="text-xs text-purple-300 mb-2">{item.meaning}</p>
                    <p className="text-xs text-slate-400 italic">"{item.example}"</p>
                  </div>
                  <button
                    onClick={() => handleListen(`${item.word}. ${item.meaning}. Example: ${item.example}`)}
                    className="flex-shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-purple-900/30 bg-[#0a0e1a]/95 backdrop-blur-md px-4 pb-6 pt-3">
        {/* Listen button (practice tab only) */}
        {activeTab === "practice" && (
          <button
            onClick={() => handleListen(scenario.clientMessage)}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm text-slate-300 hover:bg-white/10 transition-colors max-w-2xl mx-auto"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
            {isSpeaking ? "Stop" : "Listen"}
          </button>
        )}

        {/* Tab navigation */}
        <div className="flex gap-2 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab("lesson")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-medium border transition-all ${
              activeTab === "lesson"
                ? "bg-green-500/15 text-green-300 border-green-500/30"
                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Today&apos;s lesson
          </button>

          <button
            onClick={() => setActiveTab("practice")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-medium border transition-all ${
              activeTab === "practice"
                ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            Practice with client
          </button>

          <button
            onClick={() => setActiveTab("vocabulary")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-medium border transition-all ${
              activeTab === "vocabulary"
                ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            New vocabulary
          </button>
        </div>
      </div>
    </div>
  );
}
