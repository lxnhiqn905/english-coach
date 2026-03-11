"use client";

import Link from "next/link";
import { topicSummaries } from "@/lib/data/topics";

export default function TopicsPage() {
  return (
    <div className="min-h-screen pt-16 pb-8 px-4">
      <div className="max-w-lg mx-auto py-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Topics for Speaking</h1>
          <p className="text-xs text-slate-500 mt-1">{topicSummaries.length} topics · Vocabulary & Phrases</p>
        </div>

        <div className="space-y-2">
          {topicSummaries.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1a2035] px-4 py-4 hover:border-purple-500/30 hover:bg-[#1e2645] transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/15 border border-purple-500/20">
                <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-200">{topic.label}</p>
                <p className="text-xs text-slate-500">{topic.vocabCount} từ vựng · {topic.phrasesCount} mẫu câu</p>
              </div>
              <svg className="h-4 w-4 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
