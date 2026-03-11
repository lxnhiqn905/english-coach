"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchUnit,
  parseExerciseHtml,
  unitSummaries,
  wordAudioUrl,
  wordImageUrl,
  readingAudioUrl,
  readingImageUrl,
  playAudio,
  type EssentialUnit,
  type ParsedBlock,
} from "@/lib/data/essentialWords";

type Tab = "words" | "exercises" | "story";

// ─── Shared option button style ───────────────────────────────────────────────

function optCls(state: "default" | "selected" | "correct" | "wrong" | "dim") {
  const base = "w-full text-left rounded-xl border px-3 py-2.5 text-sm transition-all ";
  if (state === "selected") return base + "border-purple-500/40 bg-purple-500/10 text-purple-200";
  if (state === "correct")  return base + "border-green-500/40 bg-green-500/10 text-green-300";
  if (state === "wrong")    return base + "border-red-500/40 bg-red-500/10 text-red-300";
  if (state === "dim")      return base + "border-white/5 text-slate-600";
  return base + "border-white/10 bg-white/5 text-slate-300 hover:border-white/20";
}

// ─── Block renderers ──────────────────────────────────────────────────────────

function SingleBlock({ b, index, checked }: { b: Extract<ParsedBlock, { kind: "single" }>; index: number; checked: boolean }) {
  const [sel, setSel] = useState<number | null>(null);
  useEffect(() => setSel(null), [b]);
  return (
    <div className="space-y-2">
      {b.questionHtml && (
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-purple-400 mr-1">{index}.</span>
          <span dangerouslySetInnerHTML={{ __html: b.questionHtml }} />
        </p>
      )}
      <div className="space-y-1.5 pl-2">
        {b.options.map((opt, i) => {
          const state = checked
            ? i === b.answerIndex ? "correct" : i === sel ? "wrong" : "dim"
            : sel === i ? "selected" : "default";
          return (
            <button key={i} className={optCls(state)} onClick={() => !checked && setSel(i)}
              dangerouslySetInnerHTML={{ __html: opt }} />
          );
        })}
      </div>
    </div>
  );
}

function MultiBlock({ b, index, checked }: { b: Extract<ParsedBlock, { kind: "multi" }>; index: number; checked: boolean }) {
  const [sel, setSel] = useState<number[]>([]);
  useEffect(() => setSel([]), [b]);
  function toggle(i: number) {
    if (checked) return;
    setSel((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < b.count ? [...prev, i] : prev
    );
  }
  return (
    <div className="space-y-1.5">
      <p className="text-xs text-slate-500 pl-1">
        <span className="font-semibold text-purple-400 mr-1">{index}.</span>
        Select {b.count} related words
      </p>
      <div className="space-y-1.5 pl-2">
        {b.options.map((opt, i) => {
          const isCorrect = b.answerIndices.includes(i);
          const isSelected = sel.includes(i);
          const state = checked
            ? isCorrect ? "correct" : isSelected ? "wrong" : "dim"
            : isSelected ? "selected" : "default";
          return (
            <button key={i} className={optCls(state)} onClick={() => toggle(i)}
              dangerouslySetInnerHTML={{ __html: opt }} />
          );
        })}
      </div>
    </div>
  );
}

function FillBlankBlock({ b, index, checked }: { b: Extract<ParsedBlock, { kind: "fillblank" }>; index: number; checked: boolean }) {
  const [val, setVal] = useState("");
  useEffect(() => setVal(""), [b]);
  const isCorrect = checked && val.trim().toLowerCase() === b.answer.toLowerCase();
  const isWrong = checked && !isCorrect;
  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-300">
        <span className="font-semibold text-purple-400 mr-1">{index}.</span>
        <span dangerouslySetInnerHTML={{ __html: b.sentenceHtml }} />
      </p>
      <div className="flex items-center gap-2 pl-2">
        <span className="text-sm text-slate-500 font-mono">{b.prefix}</span>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="_ _ _"
          className={`flex-1 rounded-xl border px-3 py-2 text-sm outline-none transition-all ${
            isCorrect ? "border-green-500/40 bg-green-500/10 text-green-300"
            : isWrong ? "border-red-500/40 bg-red-500/10 text-red-300"
            : "border-white/10 bg-white/5 text-slate-200 placeholder-slate-600 focus:border-purple-500/40"
          }`}
        />
      </div>
      {checked && <p className="text-xs text-green-400 pl-2">✓ {b.answer}</p>}
    </div>
  );
}

function BetterFitBlock({ b, index, checked }: { b: Extract<ParsedBlock, { kind: "betterfit" }>; index: number; checked: boolean }) {
  const [picks, setPicks] = useState<string[]>(b.sentences.map(() => ""));
  useEffect(() => setPicks(b.sentences.map(() => "")), [b]);
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 pl-1">
        <span className="font-semibold text-purple-400 mr-1">{index}.</span>
        Words: <span className="text-purple-300">{b.words.join(" / ")}</span>
      </p>
      {b.sentences.map((sentence, si) => {
        const correct = b.answers[si] ?? "";
        const pick = picks[si] ?? "";
        const isCorrect = checked && pick === correct;
        const isWrong = checked && pick !== correct && pick !== "";
        return (
          <div key={si} className="pl-2 space-y-1">
            <p className="text-sm text-slate-300">{sentence}</p>
            <select
              value={pick}
              onChange={(e) => {
                if (checked) return;
                const next = [...picks]; next[si] = e.target.value; setPicks(next);
              }}
              className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition-all bg-[#0f1629] ${
                isCorrect ? "border-green-500/40 text-green-300"
                : isWrong ? "border-red-500/40 text-red-300"
                : "border-white/10 text-slate-300"
              }`}
            >
              <option value="">— choose —</option>
              {b.words.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
            {checked && <p className="text-xs text-green-400">✓ {correct}</p>}
          </div>
        );
      })}
    </div>
  );
}

function WordBankBlock({ b, checked }: { b: Extract<ParsedBlock, { kind: "wordbank" }>; checked: boolean }) {
  const [picks, setPicks] = useState<string[]>(b.items.map(() => ""));
  useEffect(() => setPicks(b.items.map(() => "")), [b]);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5">
        {b.wordBank.map((w) => (
          <span key={w} className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">{w}</span>
        ))}
      </div>
      {b.items.map((item, i) => {
        const pick = picks[i] ?? "";
        const isCorrect = checked && pick === item.answer;
        const isWrong = checked && pick !== item.answer && pick !== "";
        return (
          <div key={i} className="space-y-1.5">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-purple-400 mr-1">{i + 1}.</span>
              {item.sentenceHtml}
            </p>
            <select
              value={pick}
              onChange={(e) => {
                if (checked) return;
                const next = [...picks]; next[i] = e.target.value; setPicks(next);
              }}
              className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition-all bg-[#0f1629] ${
                isCorrect ? "border-green-500/40 text-green-300"
                : isWrong ? "border-red-500/40 text-red-300"
                : "border-white/10 text-slate-300"
              }`}
            >
              <option value="">— choose —</option>
              {b.wordBank.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
            {checked && <p className="text-xs text-green-400">✓ {item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}

function TextareaBlock({ b, index, checked }: { b: Extract<ParsedBlock, { kind: "textarea" }>; index: number; checked: boolean }) {
  const [val, setVal] = useState("");
  useEffect(() => setVal(""), [b]);
  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-300">
        <span className="font-semibold text-purple-400 mr-1">{index}.</span>
        {b.questionHtml}
      </p>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Your answer…"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-purple-500/40"
      />
      {checked && <p className="text-xs text-green-400">✓ {b.answer}</p>}
    </div>
  );
}

// ─── Exercise section ─────────────────────────────────────────────────────────

function ExerciseSection({ title, html }: { title: string; html: string }) {
  const [blocks, setBlocks] = useState<ParsedBlock[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setBlocks(parseExerciseHtml(html));
    setChecked(false);
  }, [html]);

  const questionBlocks = blocks.filter((b) => b.kind !== "header");
  if (questionBlocks.length === 0) return null;

  // Track per-question index (only increment for non-header blocks)
  let qIndex = 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a2035] p-5 space-y-4">
      <h3 className="text-sm font-bold text-slate-100">{title}</h3>
      {blocks.map((b, i) => {
        if (b.kind === "header") {
          return (
            <p key={i} className="text-xs font-semibold text-purple-400 uppercase tracking-wide border-t border-white/10 pt-3 mt-1">
              {b.text}
            </p>
          );
        }
        qIndex++;
        const idx = qIndex;
        if (b.kind === "single")    return <SingleBlock    key={i} b={b} index={idx} checked={checked} />;
        if (b.kind === "multi")     return <MultiBlock     key={i} b={b} index={idx} checked={checked} />;
        if (b.kind === "fillblank") return <FillBlankBlock key={i} b={b} index={idx} checked={checked} />;
        if (b.kind === "betterfit") return <BetterFitBlock key={i} b={b} index={idx} checked={checked} />;
        if (b.kind === "wordbank")  return <WordBankBlock  key={i} b={b} checked={checked} />;
        if (b.kind === "textarea")  return <TextareaBlock  key={i} b={b} index={idx} checked={checked} />;
        return null;
      })}
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
  unitId,
}: {
  word: EssentialUnit["wordlist"][0];
  unitId: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a2035] overflow-hidden">
      <div className="flex gap-3 p-4">
        {word.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={wordImageUrl(unitId, word.image)}
            alt={word.en}
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
          />
        )}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-base font-bold text-purple-300">{word.en}</span>
              <span className="ml-2 text-xs text-slate-500">{word.pron}</span>
            </div>
            {word.sound && (
              <button
                onClick={() => playAudio(wordAudioUrl(unitId, word.sound))}
                className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:border-purple-500/30 hover:text-purple-300 transition-all"
                title="Listen"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343M6.343 17.657A8 8 0 016 12m0 0a8 8 0 012.343-5.657M12 6V3m0 18v-3" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-sm text-slate-300">{word.desc}</p>
          <p
            className="text-xs text-slate-500 italic"
            dangerouslySetInnerHTML={{ __html: `→ ${word.exam}` }}
          />
        </div>
      </div>
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

  const summary = unitSummaries.find((u) => u.id === unitId);

  useEffect(() => {
    setLoading(true);
    fetchUnit(unitId)
      .then(setUnit)
      .catch(() => router.push("/essential"))
      .finally(() => setLoading(false));
  }, [unitId, router]);

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
                  <WordCard key={word.en} word={word} unitId={unitId} />
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
                  <div className="rounded-2xl border border-white/10 bg-[#1a2035] overflow-hidden">
                    {storyReading.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={readingImageUrl(unitId, storyReading.image)}
                        alt={storyReading.en}
                        className="w-full h-44 object-cover"
                      />
                    )}
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wide">
                          {storyReading.en}
                        </h3>
                        {storyReading.sound && (
                          <button
                            onClick={() => playAudio(readingAudioUrl(unitId, storyReading.sound!))}
                            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-purple-300 hover:border-purple-500/30 transition-all"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343" />
                            </svg>
                            Listen
                          </button>
                        )}
                      </div>
                      <div
                        className="prose-story text-sm leading-7 text-slate-300 space-y-3"
                        dangerouslySetInnerHTML={{ __html: storyReading.story }}
                      />
                    </div>
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
