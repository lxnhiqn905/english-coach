"use client";

import Link from "next/link";
import { communicateTopics } from "@/lib/data/communicate";

export default function CommunicatePage() {
  return (
    <div className="min-h-screen pt-16 pb-8 px-4">
      <div className="max-w-lg mx-auto py-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Mẫu câu giao tiếp</h1>
          <p className="text-xs text-slate-500 mt-1">{communicateTopics.length} chủ đề · PDF + MP3</p>
        </div>

        <div className="space-y-2">
          {communicateTopics.map((topic, i) => (
            <Link
              key={topic.id}
              href={`/communicate/${topic.id}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1a2035] px-4 py-4 hover:border-purple-500/30 hover:bg-[#1e2645] transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/15 border border-purple-500/20">
                <span className="text-xs font-bold text-purple-400">{i + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-200">{topic.title}</p>
                <p className="text-xs text-slate-500 truncate">{topic.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                {topic.hasAudio && (
                  <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                )}
                <svg className="h-4 w-4 shrink-0 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
