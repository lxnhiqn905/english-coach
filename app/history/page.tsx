"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface VocabEntry {
  id: string;
  word: string;
  phonetic: string | null;
  vietnamese: string | null;
  usage: string | null;
  created_at: string;
}

export default function VocabularyPage() {
  const [entries, setEntries] = useState<VocabEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ word: "", phonetic: "", vietnamese: "", usage: "" });
  const [saving, setSaving] = useState(false);

  async function fetchEntries() {
    if (!supabase) { setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from("vocabulary")
      .select("*")
      .eq("user_id", "1")
      .order("created_at", { ascending: false });
    setEntries(data || []);
    setLoading(false);
  }

  useEffect(() => { fetchEntries(); }, []);

  async function deleteEntry(id: string) {
    if (!supabase || deletingId) return;
    setDeletingId(id);
    await supabase.from("vocabulary").delete().eq("id", id);
    setEntries(prev => prev.filter(e => e.id !== id));
    setDeletingId(null);
  }

  async function addEntry() {
    if (!supabase || !form.word.trim() || saving) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("vocabulary")
      .insert({
        user_id: "1",
        word: form.word.trim(),
        phonetic: form.phonetic.trim() || null,
        vietnamese: form.vietnamese.trim() || null,
        usage: form.usage.trim() || null,
      })
      .select()
      .single();
    setSaving(false);
    if (!error && data) {
      setEntries(prev => [data, ...prev]);
      setForm({ word: "", phonetic: "", vietnamese: "", usage: "" });
      setShowAdd(false);
    }
  }

  return (
    <div className="min-h-screen pt-16 pb-8 px-4">
      <div className="max-w-2xl mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-slate-100">My Vocabulary</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 px-4 py-2 text-sm text-purple-300 hover:bg-purple-500/25 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add word
          </button>
        </div>

        {/* Add modal */}
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-[#0f1629] border border-white/10 shadow-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-300">Add new word</h3>
                <button
                  onClick={() => setShowAdd(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <input
                  placeholder="Word *"
                  value={form.word}
                  onChange={e => setForm({ ...form, word: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                />
                <input
                  placeholder="Phonetic (e.g. /ˈaʊtɪdʒ/)"
                  value={form.phonetic}
                  onChange={e => setForm({ ...form, phonetic: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                />
                <input
                  placeholder="Vietnamese meaning"
                  value={form.vietnamese}
                  onChange={e => setForm({ ...form, vietnamese: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                />
                <textarea
                  placeholder="Usage example"
                  value={form.usage}
                  onChange={e => setForm({ ...form, usage: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={addEntry}
                  disabled={!form.word.trim() || saving}
                  className="flex-1 rounded-xl bg-purple-500/20 border border-purple-500/40 py-2.5 text-sm font-medium text-purple-300 hover:bg-purple-500/30 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setShowAdd(false)}
                  className="px-5 rounded-xl border border-white/10 py-2.5 text-sm text-slate-400 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!supabase ? (
          <div className="text-center py-12 text-slate-500 text-sm">Supabase not configured.</div>
        ) : loading ? (
          <div className="text-center py-12 text-slate-500 text-sm">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-sm mb-1">No saved words yet.</p>
            <p className="text-slate-600 text-xs">Go to New Vocabulary and tap Save on any word.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map(entry => (
              <div key={entry.id} className="rounded-xl border border-white/10 bg-[#1a2035] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-base font-bold text-slate-100">{entry.word}</span>
                      {entry.phonetic && <span className="text-xs text-slate-500">{entry.phonetic}</span>}
                    </div>
                    {entry.vietnamese && <p className="text-xs text-blue-300 mt-1">{entry.vietnamese}</p>}
                    {entry.usage && <p className="text-xs text-slate-400 italic mt-1">"{entry.usage}"</p>}
                    <p className="text-[11px] text-slate-600 mt-2">
                      {new Date(entry.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    disabled={deletingId === entry.id}
                    className="flex-shrink-0 rounded-lg border border-red-500/20 bg-red-500/5 p-2 text-red-400 hover:bg-red-500/15 disabled:opacity-50 transition-colors"
                  >
                    {deletingId === entry.id ? (
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
