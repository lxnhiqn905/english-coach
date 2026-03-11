"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchTopic, type TopicDetail, type VocabItem, type PhraseItem } from "@/lib/data/topics";

type Tab = "vocab" | "phrases";

function groupBy<T>(items: T[], key: keyof T): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = String(item[key]);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  }
  return map;
}

function VocabSection({ vocab }: { vocab: VocabItem[] }) {
  const groups = groupBy(vocab, "category");
  return (
    <div className="space-y-6">
      {Array.from(groups.entries()).map(([category, items]) => (
        <div key={category}>
          {category && (
            <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-3 px-1">
              {category}
            </h3>
          )}
          <div className="space-y-1.5">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-baseline gap-3 rounded-xl border border-white/10 bg-[#1a2035] px-4 py-3"
              >
                <span className="text-sm font-semibold text-purple-300 shrink-0">{item.en}</span>
                {item.type && (
                  <span className="text-xs text-slate-600 shrink-0">({item.type})</span>
                )}
                <span className="text-sm text-slate-400 min-w-0">{item.vi}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PhrasesSection({ phrases }: { phrases: PhraseItem[] }) {
  const groups = groupBy(phrases, "category");
  return (
    <div className="space-y-6">
      {Array.from(groups.entries()).map(([category, items]) => (
        <div key={category}>
          {category && (
            <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-3 px-1">
              {category}
            </h3>
          )}
          <div className="space-y-2">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-[#1a2035] px-4 py-3 space-y-1"
              >
                <p className="text-sm font-medium text-slate-200">{item.en}</p>
                {item.vi && (
                  <p className="text-xs text-slate-500 italic">{item.vi}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const router = useRouter();
  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("vocab");

  useEffect(() => {
    setLoading(true);
    fetchTopic(topicId)
      .then(setTopic)
      .catch(() => router.push("/topics"))
      .finally(() => setLoading(false));
  }, [topicId, router]);

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
          <p className="text-sm font-bold text-slate-100 truncate flex-1">
            {topic?.label ?? "…"}
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-lg mx-auto mt-3 flex gap-1">
          {([
            { key: "vocab",   label: `Vocabulary${topic ? ` (${topic.vocab.length})` : ""}` },
            { key: "phrases", label: `Sentences${topic ? ` (${topic.phrases.length})` : ""}` },
          ] as { key: Tab; label: string }[]).map(({ key, label }) => (
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
          <div className="flex items-center justify-center py-20 text-slate-500 text-sm">Loading…</div>
        ) : !topic ? null : (
          <>
            {tab === "vocab"   && <VocabSection   vocab={topic.vocab} />}
            {tab === "phrases" && <PhrasesSection phrases={topic.phrases} />}
          </>
        )}
      </div>
    </div>
  );
}
