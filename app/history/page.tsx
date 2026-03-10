"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { ReadModal } from "@/components/ReadModal";

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
  const [readModal, setReadModal] = useState<{ text: string; label: string } | null>(null);
  const { speak, stop, isSpeaking } = useSpeechSynthesis();

  function handleListen(text: string) {
    if (isSpeaking) stop(); else speak(text);
  }

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
            {readModal && (
              <ReadModal targetText={readModal.text} label={readModal.label} onClose={() => setReadModal(null)} />
            )}
            {entries.map(entry => (
              <div key={entry.id} className="rounded-xl border border-white/10 bg-[#1a2035] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-base font-bold text-slate-100">{entry.word}</span>
                      {entry.phonetic && <span className="text-xs text-slate-500">{entry.phonetic}</span>}
                    </div>
                    {entry.vietnamese && <p className="text-xs text-blue-300 mt-1">{entry.vietnamese}</p>}
                    {entry.usage && <p className="text-xs text-slate-400 italic mt-1">"{entry.usage}"</p>}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => handleListen(`${entry.word}${entry.usage ? ". Example: " + entry.usage : ""}`)}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-slate-300 hover:bg-white/10 transition-colors"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
                        Listen
                      </button>
                      <button
                        onClick={() => setReadModal({ text: entry.word, label: entry.word })}
                        className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1.5 text-[11px] text-purple-300 hover:bg-purple-500/20 transition-colors"
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
                        Read
                      </button>
                      <p className="text-[11px] text-slate-600 ml-auto">
                        {new Date(entry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
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
