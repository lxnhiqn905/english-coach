"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchUnit,
  parseExerciseHtml,
  unitSummaries,
  type EssentialUnit,
  type ParsedQuestion,
} from "@/lib/data/essentialWords";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useVoiceSettings } from "@/lib/useVoiceSettings";

type Tab = "words" | "exercises" | "story";

// ─── Interactive exercise component ─────────────────────────────────────────

function QuestionBlock({
  q,
  index,
  checked,
}: {
  q: ParsedQuestion;
  index: number;
  checked: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => { setSelected(null); setAnswer(""); }, [q]);

  if (q.isTextarea) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-purple-400 mr-2">{index + 1}.</span>
          {q.questionHtml}
        </p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer…"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-purple-500/40"
        />
        {checked && (
          <p className="text-xs text-green-400 bg-green-500/10 rounded-lg px-3 py-2">
            ✓ {q.textareaValue}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p
        className="text-sm text-slate-300"
        dangerouslySetInnerHTML={{
          __html: `<span class="font-semibold text-purple-400 mr-1">${index + 1}.</span> ${q.questionHtml}`,
        }}
      />
      <div className="space-y-1.5 pl-2">
        {q.options.map((opt, i) => {
          let cls =
            "flex items-start gap-2 rounded-xl border px-3 py-2.5 text-sm cursor-pointer transition-all ";
          if (checked) {
            if (i === q.answerIndex) {
              cls += "border-green-500/40 bg-green-500/10 text-green-300";
            } else if (i === selected && i !== q.answerIndex) {
              cls += "border-red-500/40 bg-red-500/10 text-red-300";
            } else {
              cls += "border-white/5 bg-white/3 text-slate-500";
            }
          } else {
            cls +=
              selected === i
                ? "border-purple-500/40 bg-purple-500/10 text-purple-200"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20";
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => !checked && setSelected(i)}
              dangerouslySetInnerHTML={{ __html: opt }}
            />
          );
        })}
      </div>
    </div>
  );
}

function ExerciseSection({
  title,
  html,
}: {
  title: string;
  html: string;
}) {
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setQuestions(parseExerciseHtml(html));
    setChecked(false);
  }, [html]);

  if (questions.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a2035] p-5 space-y-5">
      <h3 className="text-sm font-bold text-slate-100">{title}</h3>
      {questions.map((q, i) => (
        <QuestionBlock key={i} q={q} index={i} checked={checked} />
      ))}
      <button
        onClick={() => setChecked((c) => !c)}
        className={`w-full rounded-xl border py-2.5 text-sm font-medium transition-all ${
          checked
            ? "border-green-500/30 bg-green-500/10 text-green-300"
            : "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
        }`}
      >
        {checked ? "Hide Answers" : "Check Answers"}
      </button>
    </div>
  );
}

// ─── Word card ───────────────────────────────────────────────────────────────

function WordCard({
  word,
  onListen,
}: {
  word: EssentialUnit["wordlist"][0];
  onListen: (text: string) => void;
}) {
  // strip html tags from exam for clean display
  const cleanExam = word.exam.replace(/<[^>]+>/g, "");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a2035] p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-base font-bold text-purple-300">{word.en}</span>
          <span className="ml-2 text-xs text-slate-500">{word.pron}</span>
        </div>
        <button
          onClick={() => onListen(word.en)}
          className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:border-purple-500/30 hover:text-purple-300 transition-all"
          title="Listen"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343M6.343 17.657A8 8 0 016 12m0 0a8 8 0 012.343-5.657M12 6V3m0 18v-3" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-slate-300">{word.desc}</p>
      <p
        className="text-xs text-slate-500 italic"
        dangerouslySetInnerHTML={{ __html: `→ ${word.exam}` }}
      />
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function UnitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const unitId = Number(params.unitId);

  const [unit, setUnit] = useState<EssentialUnit | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("words");

  const { voices, speak } = useSpeechSynthesis();
  const { rate, getVoice } = useVoiceSettings();

  const summary = unitSummaries.find((u) => u.id === unitId);

  useEffect(() => {
    setLoading(true);
    fetchUnit(unitId)
      .then(setUnit)
      .catch(() => router.push("/essential"))
      .finally(() => setLoading(false));
  }, [unitId, router]);

  function handleListen(text: string) {
    const voice = getVoice(voices);
    speak(text, { voice, rate });
  }

  const storyReading = unit?.reading.find((r) => r.type === "story");
  const faqReading = unit?.reading.find((r) => r.type === "faq");
  const exercises = unit?.exercise.filter((e) =>
    e.en.startsWith("Exercise")
  ) ?? [];

  return (
    <div className="min-h-screen pt-16 pb-8">
      {/* Header */}
      <div className="sticky top-14 z-10 border-b border-white/10 bg-[#0f1629]/95 backdrop-blur px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-slate-200 transition-all"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-100 truncate">
              {summary?.unit} {summary ? `· ${summary.story}` : ""}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-lg mx-auto mt-3 flex gap-1">
          {(
            [
              { key: "words", label: "Word List" },
              { key: "exercises", label: "Exercises" },
              { key: "story", label: "Story" },
            ] as { key: Tab; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                tab === key
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-5">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-500 text-sm">
            Loading…
          </div>
        ) : !unit ? null : (
          <>
            {/* Words Tab */}
            {tab === "words" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">{unit.wordlist.length} words in this unit</p>
                {unit.wordlist.map((word) => (
                  <WordCard key={word.en} word={word} onListen={handleListen} />
                ))}
              </div>
            )}

            {/* Exercises Tab */}
            {tab === "exercises" && (
              <div className="space-y-5">
                {exercises.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-10">No exercises for this unit.</p>
                ) : (
                  exercises.map((ex) => (
                    <ExerciseSection key={ex.en} title={ex.en} html={ex.story} />
                  ))
                )}
              </div>
            )}

            {/* Story Tab */}
            {tab === "story" && (
              <div className="space-y-5">
                {storyReading && (
                  <div className="rounded-2xl border border-white/10 bg-[#1a2035] p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide">
                        {storyReading.en}
                      </h3>
                      <button
                        onClick={() => {
                          const text = storyReading.story.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
                          handleListen(text);
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-purple-300 hover:border-purple-500/30 transition-all"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343" />
                        </svg>
                        Listen
                      </button>
                    </div>
                    <div
                      className="prose-story text-sm leading-7 text-slate-300 space-y-3"
                      dangerouslySetInnerHTML={{ __html: storyReading.story }}
                    />
                  </div>
                )}

                {faqReading && (
                  <ExerciseSection
                    title="Reading Comprehension"
                    html={faqReading.story}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Story styles */}
      <style jsx global>{`
        .prose-story strong.idiom-tip,
        .prose-story strong {
          color: #4ade80;
          font-weight: 700;
        }
        .prose-story p {
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
}
