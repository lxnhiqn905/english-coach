"use client";

import Link from "next/link";
import { grammarUnits } from "@/lib/data/grammar";

export default function GrammarPage() {
  return (
    <div className="min-h-screen pt-16 pb-8 px-4">
      <div className="max-w-lg mx-auto py-6 space-y-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Grammar</h1>
          <p className="text-xs text-slate-500 mt-1">
            {grammarUnits.length} units · Destination B1
          </p>
        </div>

        <div className="space-y-2">
          {grammarUnits.map((unit) => (
            <Link
              key={unit.id}
              href={`/grammar/${unit.id}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1a2035] px-4 py-4 hover:border-emerald-500/30 hover:bg-[#1e2645] transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400">{unit.unit}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-200">{unit.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {unit.subtopics.map((s) => s.name).join(" · ")}
                </p>
              </div>
              <svg
                className="h-4 w-4 shrink-0 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
