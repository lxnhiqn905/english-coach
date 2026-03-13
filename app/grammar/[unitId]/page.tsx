"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { grammarContent, type GrammarContent } from "@/lib/data/grammarContent";

type Tab = "definition" | "structure" | "notes" | "exercises" | "reading";

const TABS: { key: Tab; label: string; vi: string }[] = [
  { key: "definition", label: "Definition", vi: "Definition" },
  { key: "structure",  label: "Structure",  vi: "Structure" },
  { key: "notes",      label: "Notes",      vi: "Notes" },
  { key: "exercises",  label: "Exercises",  vi: "Exercises" },
  { key: "reading",    label: "Reading",    vi: "Reading" },
];

function speak(text: string) {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "en-US";
  window.speechSynthesis.speak(utt);
}

function SpeakButton({ text, color = "text-slate-400 hover:text-emerald-300 hover:border-emerald-500/30" }: { text: string; color?: string }) {
  return (
    <button
      onClick={() => speak(text)}
      className={`shrink-0 rounded-lg border border-white/10 bg-white/5 p-1.5 transition-all ${color}`}
      title="Listen"
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    </button>
  );
}

const TAB_COLORS: Record<Tab, string> = {
  definition: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  structure:  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  notes:      "bg-amber-500/20 text-amber-300 border-amber-500/30",
  exercises:  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  reading:    "bg-teal-500/20 text-teal-300 border-teal-500/30",
};

/* ──────────── Definition tab ──────────── */
function DefinitionTab({ unit }: { unit: GrammarContent }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
        <div className="flex items-start gap-2">
          <p className="text-sm text-slate-200 leading-relaxed flex-1">{unit.definition.description}</p>
          <SpeakButton text={unit.definition.description} />
        </div>
      </div>
      <div className="space-y-2">
        {unit.definition.situations.map((s, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-[#0f1629] px-4 py-3">
            <p className="text-xs font-semibold text-emerald-400 mb-1">{s.situation}</p>
            <div className="flex items-start gap-2">
              <p className="text-sm text-slate-300 italic flex-1">"{s.example}"</p>
              <SpeakButton text={s.example} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────── Structure tab ──────────── */
function StructureTab({ unit }: { unit: GrammarContent }) {
  return (
    <div className="space-y-5">
      {unit.structures.map((s, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-[#1a2035] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/5 bg-blue-500/5">
            <p className="text-sm font-bold text-blue-300">{s.name}</p>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { label: "Positive", pattern: s.positive, example: s.example_positive, color: "text-emerald-400" },
              { label: "Negative", pattern: s.negative, example: s.example_negative, color: "text-red-400" },
              { label: "Question", pattern: s.question, example: s.example_question, color: "text-blue-400" },
            ].map(({ label, pattern, example, color }) => (
              <div key={label} className="px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide ${color}`}>{label}</span>
                </div>
                <p className="text-xs font-mono text-slate-300 bg-white/5 rounded-lg px-3 py-1.5 mb-1.5">{pattern}</p>
                <div className="flex items-start gap-2">
                  <p className="text-sm text-slate-400 italic flex-1">→ {example}</p>
                  <SpeakButton text={example} color="text-slate-400 hover:text-blue-300 hover:border-blue-500/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ──────────── Notes tab ──────────── */
function NotesTab({ unit }: { unit: GrammarContent }) {
  return (
    <div className="space-y-2">
      {unit.notes.map((note, i) => (
        <div key={i} className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-400">
            {i + 1}
          </span>
          <p className="text-sm text-slate-300 leading-relaxed flex-1">{note}</p>
          <SpeakButton text={note} color="text-slate-400 hover:text-amber-300 hover:border-amber-500/30" />
        </div>
      ))}
    </div>
  );
}

/* ──────────── Exercises tab ──────────── */
function ExercisesTab({ unit }: { unit: GrammarContent }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  function handleCheck() { setChecked(true); }
  function handleReset() { setAnswers({}); setChecked(false); }

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">Fill in the blank with the correct form.</p>
      {unit.exercises.map((ex, i) => {
        const userAnswer = (answers[i] ?? "").trim().toLowerCase();
        const correct = ex.answer.toLowerCase();
        const isCorrect = checked && userAnswer === correct;
        const isWrong = checked && userAnswer !== correct && userAnswer !== "";
        const isEmpty = checked && userAnswer === "";

        const parts = ex.sentence.split("_____");

        return (
          <div
            key={i}
            className={`rounded-xl border px-4 py-3 transition-colors ${
              isCorrect ? "border-emerald-500/40 bg-emerald-500/5"
              : isWrong  ? "border-red-500/40 bg-red-500/5"
              : isEmpty  ? "border-amber-500/40 bg-amber-500/5"
              : "border-white/10 bg-[#0f1629]"
            }`}
          >
            <div className="flex items-start gap-2 mb-2">
              <span className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-[10px] font-bold text-purple-400">{i + 1}</span>
              <div className="flex-1 flex flex-wrap items-center gap-1 text-sm text-slate-200 min-w-0">
                <span>{parts[0]}</span>
                {checked ? (
                  <span className={`font-semibold px-1.5 py-0.5 rounded ${isCorrect ? "text-emerald-300" : "text-red-300"}`}>
                    {answers[i] || "___"}
                  </span>
                ) : (
                  <input
                    type="text"
                    value={answers[i] ?? ""}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                    className="w-28 border-b border-purple-500/50 bg-transparent text-center text-sm text-purple-200 outline-none focus:border-purple-400"
                    placeholder="..."
                  />
                )}
                <span>{parts[1]}</span>
              </div>
              {checked && (
                <SpeakButton text={ex.sentence.replace("_____", ex.answer).replace(/\s*\([^)]+\)/g, "")} color="text-slate-400 hover:text-purple-300 hover:border-purple-500/30" />
              )}
            </div>
            <div className="flex items-center justify-between pl-7">
              <span className="text-[10px] text-slate-600 italic">Hint: {ex.hint}</span>
              {checked && (
                <span className={`text-[11px] font-medium ${isCorrect ? "text-emerald-400" : "text-slate-400"}`}>
                  {isCorrect ? "✓ Correct!" : `Answer: ${ex.answer}`}
                </span>
              )}
            </div>
          </div>
        );
      })}

      <div className="flex gap-2 pt-1">
        {!checked ? (
          <button
            onClick={handleCheck}
            className="flex-1 rounded-xl bg-purple-500/20 border border-purple-500/30 py-2.5 text-sm font-semibold text-purple-300 hover:bg-purple-500/30 transition-colors"
          >
            Check answers
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 rounded-xl bg-white/5 border border-white/10 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

/* ──────────── Reading tab ──────────── */
function ReadingTab({ unit }: { unit: GrammarContent }) {

  // highlight sentences that appear in the text
  function renderText(text: string) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
    return sentences.map((sentence, i) => {
      const isHighlighted = unit.reading.highlight.some((h) =>
        sentence.trim().includes(h.replace(/[.!?]$/, "").trim())
      );
      return (
        <span key={i} className={isHighlighted ? "text-teal-300 font-medium" : "text-slate-300"}>
          {sentence}{" "}
        </span>
      );
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-teal-500/20 bg-[#0f1629] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/5 bg-teal-500/5 flex items-center gap-2">
          <p className="text-sm font-bold text-teal-300 flex-1">{unit.reading.title}</p>
          <SpeakButton text={unit.reading.text} color="text-slate-400 hover:text-teal-300 hover:border-teal-500/30" />
        </div>
        <div className="px-4 py-4">
          <p className="text-sm leading-relaxed">{renderText(unit.reading.text)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 px-4 py-3">
        <p className="text-[10px] font-semibold text-teal-400 uppercase tracking-wide mb-2">
          Key examples in the text
        </p>
        <ul className="space-y-1">
          {unit.reading.highlight.map((h, i) => (
            <li key={i} className="text-sm text-slate-300 italic">• "{h}"</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ──────────── Main page ──────────── */
export default function GrammarUnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("definition");

  const unit = grammarContent.find((u) => u.id === unitId);
  if (!unit) {
    router.push("/grammar");
    return null;
  }

  return (
    <div className="min-h-screen pt-16 pb-8">
      {/* Sticky header + tabs */}
      <div className="sticky top-14 z-10 border-b border-white/10 bg-[#0f1629]/95 backdrop-blur px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => router.back()}
              className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-slate-200 transition-all"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-slate-500">Unit {unit.unit}</p>
              <p className="text-sm font-bold text-slate-100 truncate">{unit.title}</p>
            </div>
          </div>

          {/* Tabs — scroll horizontally on mobile */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
            {TABS.map(({ key, vi }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`shrink-0 rounded-xl px-3 py-1.5 text-[11px] font-semibold border transition-all ${
                  tab === key
                    ? TAB_COLORS[key]
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                {vi}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-5">
        {tab === "definition" && <DefinitionTab unit={unit} />}
        {tab === "structure"  && <StructureTab  unit={unit} />}
        {tab === "notes"      && <NotesTab      unit={unit} />}
        {tab === "exercises"  && <ExercisesTab  unit={unit} />}
        {tab === "reading"    && <ReadingTab    unit={unit} />}
      </div>
    </div>
  );
}
