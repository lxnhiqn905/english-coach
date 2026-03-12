"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { grammarUnits, type GrammarSubtopic } from "@/lib/data/grammar";

function FormSection({ subtopic }: { subtopic: GrammarSubtopic }) {
  if (!subtopic.form) return null;
  const { statement, negative, question } = subtopic.form;
  const rows = [
    { label: "Statement", value: statement },
    { label: "Negative", value: negative },
    { label: "Question", value: question },
  ].filter((r) => r.value);
  return (
    <div className="space-y-2">
      {rows.map(({ label, value }) => (
        <div key={label} className="rounded-xl border border-white/10 bg-[#0f1629] px-4 py-3">
          <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-sm text-slate-200 leading-relaxed">{value}</p>
        </div>
      ))}
    </div>
  );
}

function UsesSection({ subtopic }: { subtopic: GrammarSubtopic }) {
  if (!subtopic.uses.length) return null;
  return (
    <div className="space-y-2">
      {subtopic.uses.map((u, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 bg-[#0f1629] px-4 py-3"
        >
          <p className="text-xs font-semibold text-blue-300 mb-1">{u.use}</p>
          <p className="text-sm text-slate-300 italic">"{u.example}"</p>
        </div>
      ))}
    </div>
  );
}

function HintsSection({ subtopic }: { subtopic: GrammarSubtopic }) {
  const all = [...subtopic.helpful_hints, ...subtopic.watch_out];
  if (!all.length) return null;
  return (
    <div className="space-y-2">
      {subtopic.helpful_hints.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-[#1a1a10]/60 px-4 py-3">
          <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wide mb-2">
            💡 Helpful hints
          </p>
          <ul className="space-y-1">
            {subtopic.helpful_hints.map((h, i) => (
              <li key={i} className="text-sm text-slate-300 leading-relaxed">
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
      {subtopic.watch_out.length > 0 && (
        <div className="rounded-xl border border-red-500/20 bg-[#1a0f0f]/60 px-4 py-3">
          <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wide mb-2">
            ⚠️ Watch out!
          </p>
          <ul className="space-y-1">
            {subtopic.watch_out.map((w, i) => (
              <li key={i} className="text-sm text-slate-300 leading-relaxed">
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const SECTIONS = [
  {
    key: "definition",
    label: "Định nghĩa",
    color: "emerald",
    render: (s: GrammarSubtopic) => <FormSection subtopic={s} />,
    hasContent: (s: GrammarSubtopic) => !!s.form,
  },
  {
    key: "usage",
    label: "Cách dùng & Ví dụ",
    color: "blue",
    render: (s: GrammarSubtopic) => <UsesSection subtopic={s} />,
    hasContent: (s: GrammarSubtopic) => s.uses.length > 0,
  },
  {
    key: "notes",
    label: "Lưu ý",
    color: "amber",
    render: (s: GrammarSubtopic) => <HintsSection subtopic={s} />,
    hasContent: (s: GrammarSubtopic) =>
      s.helpful_hints.length > 0 || s.watch_out.length > 0,
  },
] as const;

const COLOR_MAP = {
  emerald: {
    tab: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    inactive: "text-slate-500 hover:text-slate-300",
    badge: "bg-emerald-500/15 border-emerald-500/20 text-emerald-400",
  },
  blue: {
    tab: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    inactive: "text-slate-500 hover:text-slate-300",
    badge: "bg-blue-500/15 border-blue-500/20 text-blue-400",
  },
  amber: {
    tab: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    inactive: "text-slate-500 hover:text-slate-300",
    badge: "bg-amber-500/15 border-amber-500/20 text-amber-400",
  },
};

export default function GrammarUnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const router = useRouter();

  const unit = grammarUnits.find((u) => u.id === unitId);
  if (!unit) {
    router.push("/grammar");
    return null;
  }

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
            <p className="text-[10px] text-slate-500">Unit {unit.unit}</p>
            <p className="text-sm font-bold text-slate-100 truncate">{unit.title}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-5 space-y-6">
        {unit.subtopics.map((subtopic, si) => (
          <SubtopicCard key={si} subtopic={subtopic} index={si} />
        ))}
      </div>
    </div>
  );
}

function SubtopicCard({
  subtopic,
  index,
}: {
  subtopic: GrammarSubtopic;
  index: number;
}) {
  const availableSections = SECTIONS.filter((s) => s.hasContent(subtopic));
  const defaultSection = availableSections[0]?.key ?? "definition";

  const [activeSection, setActiveSection] = useState(defaultSection);

  const activeConfig = SECTIONS.find((s) => s.key === activeSection);
  const colorScheme =
    COLOR_MAP[activeConfig?.color ?? "emerald"];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#1a2035] overflow-hidden">
      {/* Subtopic header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${colorScheme.badge}`}
        >
          {index + 1}
        </div>
        <p className="text-sm font-bold text-slate-100">{subtopic.name}</p>
      </div>

      {/* Section tabs */}
      {availableSections.length > 1 && (
        <div className="flex gap-1 px-3 pt-3">
          {availableSections.map((s) => {
            const c = COLOR_MAP[s.color];
            return (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`flex-1 rounded-xl py-1.5 text-[11px] font-semibold transition-all ${
                  activeSection === s.key ? c.tab : c.inactive
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Section content */}
      <div className="px-3 py-3">
        {activeConfig?.render(subtopic)}
      </div>
    </div>
  );
}
